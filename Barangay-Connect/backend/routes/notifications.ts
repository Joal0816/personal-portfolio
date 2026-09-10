import express, { Response } from "express";
import { supabase } from "../config/supabase";
import { protect, admin, AuthRequest } from "../middleware/auth";

const router = express.Router();

// Mark all as read
router.patch("/mark-all-read", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("user_id", req.user!.id)
      .eq("is_read", false);

    if (error) throw error;
    res.json({ message: "All notifications marked as read" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Mark by type
router.patch("/mark-announcements-read", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("user_id", req.user!.id)
      .eq("is_read", false)
      .or("type.eq.announcement,related_entity_type.eq.announcement")
      .select("id");

    if (error) throw error;
    res.json({ message: "Announcement notifications marked as read", modifiedCount: data?.length || 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/mark-sms-read", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("user_id", req.user!.id)
      .eq("is_read", false)
      .or("type.eq.sms,related_entity_type.eq.sms")
      .select("id");

    if (error) throw error;
    res.json({ message: "SMS notifications marked as read", modifiedCount: data?.length || 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/mark-polls-read", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("user_id", req.user!.id)
      .eq("is_read", false)
      .or("type.eq.poll,related_entity_type.eq.poll")
      .select("id");

    if (error) throw error;
    res.json({ message: "Poll notifications marked as read", modifiedCount: data?.length || 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/mark-verification-read", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("user_id", req.user!.id)
      .eq("is_read", false)
      .or("type.eq.system,related_entity_type.eq.verification_status")
      .select("id");

    if (error) throw error;
    res.json({ message: "Verification notifications marked as read", modifiedCount: data?.length || 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all read
router.delete("/delete-all-read", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .delete()
      .eq("user_id", req.user!.id)
      .eq("is_read", true)
      .select("id");

    if (error) throw error;
    res.json({ message: `${data?.length || 0} notifications deleted` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get unread notifications
router.get("/unread", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", req.user!.id)
      .eq("is_read", false)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ notifications: data || [] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get unread count
router.get("/unread-count", protect, async (req: AuthRequest, res: Response) => {
  try {
    const type = req.query.type?.toString().toLowerCase();

    let query = supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", req.user!.id)
      .eq("is_read", false);

    if (type) {
      query = query.or(`type.eq.${type},related_entity_type.eq.${type}`);
    }

    const { count, error } = await query;

    if (error) throw error;
    res.json({ count: count || 0 });
  } catch (error: any) {
    res.json({ count: 0 });
  }
});

// List notifications (paginated)
router.get("/", protect, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("notifications")
      .select("*", { count: "exact" })
      .eq("user_id", req.user!.id);

    if (req.query.unreadOnly === "true") query = query.eq("is_read", false);
    if (req.query.type) query = query.eq("type", req.query.type as string);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    const { count: unreadCount } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", req.user!.id)
      .eq("is_read", false);

    res.json({
      notifications: data,
      total: count || 0,
      unreadCount: unreadCount || 0,
      page,
      pages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update admin notes
router.patch("/:id/admin-notes", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { admin_notes } = req.body;
    const { data, error } = await supabase
      .from("notifications")
      .update({ admin_notes: admin_notes || "" })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Mark as read
router.patch("/:id/read", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("id", req.params.id)
      .eq("user_id", req.user!.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Mark as unread
router.patch("/:id/unread", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: false, read_at: null })
      .eq("id", req.params.id)
      .eq("user_id", req.user!.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete notification
router.delete("/:id", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", req.params.id)
      .eq("user_id", req.user!.id);

    if (error) throw error;
    res.json({ message: "Notification deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
