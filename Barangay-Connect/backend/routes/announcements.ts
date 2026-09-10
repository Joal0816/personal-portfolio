import express, { Response } from "express";
import { supabase } from "../config/supabase";
import { protect, admin, AuthRequest } from "../middleware/auth";

const router = express.Router();

// List announcements (authenticated users)
router.get("/", protect, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("announcements")
      .select("*, profiles:created_by(first_name, last_name, role)", { count: "exact" })
      .eq("is_active", true);

    if (req.query.category && req.query.category !== "all") {
      query = query.eq("category", req.query.category as string);
    }

    if (req.query.search && (req.query.search as string).trim()) {
      const search = req.query.search as string;
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const { data, count, error } = await query
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Get read status for this user
    const announcementIds = (data || []).map((a) => a.id);
    let readStatuses: Record<string, boolean> = {};

    if (announcementIds.length > 0) {
      const { data: readData } = await supabase
        .from("announcement_read_status")
        .select("announcement_id")
        .eq("user_id", req.user!.id)
        .in("announcement_id", announcementIds);

      if (readData) {
        readData.forEach((r) => { readStatuses[r.announcement_id] = true; });
      }
    }

    const announcementsWithRead = (data || []).map((a) => ({
      ...a,
      isRead: !!readStatuses[a.id],
    }));

    res.json({
      announcements: announcementsWithRead,
      total: count || 0,
      page,
      pages: Math.ceil((count || 0) / limit),
      hasMore: page * limit < (count || 0),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: list all announcements
router.get("/admin/all", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("announcements")
      .select("*, profiles:created_by(first_name, last_name, role)", { count: "exact" });

    if (req.query.status === "active") query = query.eq("is_active", true);
    if (req.query.status === "inactive") query = query.eq("is_active", false);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({ announcements: data, total: count || 0, page, pages: Math.ceil((count || 0) / limit) });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get announcement by ID
router.get("/:id", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*, profiles:created_by(first_name, last_name, email, role)")
      .eq("id", req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create announcement (admin)
router.post("/", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, category, is_pinned, priority, expiry_date } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const { data, error } = await supabase
      .from("announcements")
      .insert({
        title,
        content,
        category: category || "general",
        is_pinned: is_pinned || false,
        priority: priority || "normal",
        is_active: true,
        expiry_date: expiry_date || null,
        created_by: req.user!.id,
      })
      .select("*, profiles:created_by(first_name, last_name, role)")
      .single();

    if (error) throw error;

    // Create notifications for all users
    const { data: users } = await supabase.from("profiles").select("user_id").eq("role", "user");
    if (users && users.length > 0) {
      const notifications = users.map((u) => ({
        user_id: u.user_id,
        type: "announcement",
        title: "New Announcement",
        message: title,
        priority: priority || "medium",
        related_entity_type: "announcement",
        related_entity_id: data.id,
        action_url: "/announcements",
      }));
      await supabase.from("notifications").insert(notifications);
    }

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update announcement (admin)
router.patch("/:id", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, category, is_pinned, priority, is_active, expiry_date } = req.body;

    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (is_pinned !== undefined) updateData.is_pinned = is_pinned;
    if (priority !== undefined) updateData.priority = priority;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (expiry_date !== undefined) updateData.expiry_date = expiry_date;

    const { data, error } = await supabase
      .from("announcements")
      .update(updateData)
      .eq("id", req.params.id)
      .select("*, profiles:created_by(first_name, last_name, role)")
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete announcement (admin)
router.delete("/:id", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase.from("announcements").delete().eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Announcement deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Mark announcement as read
router.post("/:id/mark-read", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase
      .from("announcement_read_status")
      .upsert({
        announcement_id: req.params.id,
        user_id: req.user!.id,
      }, { onConflict: "announcement_id,user_id" });

    if (error) throw error;

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
