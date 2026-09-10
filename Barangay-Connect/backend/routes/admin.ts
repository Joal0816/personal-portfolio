import express, { Response } from "express";
import { supabase } from "../config/supabase";
import { protect, admin, AuthRequest } from "../middleware/auth";

const router = express.Router();

router.use(protect, admin);

// Admin stats
router.get("/stats", async (req: AuthRequest, res: Response) => {
  try {
    const [usersRes, incidentsRes, documentsRes, pollsRes, smsRes] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "user"),
      supabase.from("incidents").select("*", { count: "exact", head: true }),
      supabase.from("document_requests").select("*", { count: "exact", head: true }),
      supabase.from("polls").select("*", { count: "exact", head: true }).eq("is_deleted", false),
      supabase.from("sms_alerts").select("*", { count: "exact", head: true }).eq("status", "sent"),
    ]);

    const pendingIncidents = await supabase.from("incidents").select("*", { count: "exact", head: true }).eq("status", "pending");
    const pendingDocuments = await supabase.from("document_requests").select("*", { count: "exact", head: true }).eq("status", "pending");
    const activePolls = await supabase.from("polls").select("*", { count: "exact", head: true }).eq("status", "active").eq("is_deleted", false);
    const activeUsers = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "user").eq("is_active", true);
    const verifiedUsers = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "user").eq("is_verified", true);

    const recentIncidents = await supabase.from("incidents").select("*, profiles:user_id(first_name, last_name, email)").order("created_at", { ascending: false }).limit(5);
    const recentDocuments = await supabase.from("document_requests").select("*, profiles:user_id(first_name, last_name, email)").order("created_at", { ascending: false }).limit(5);
    const recentUsers = await supabase.from("profiles").select("*").eq("role", "user").order("created_at", { ascending: false }).limit(5);

    res.json({
      totalUsers: usersRes.count || 0,
      totalIncidents: incidentsRes.count || 0,
      totalDocuments: documentsRes.count || 0,
      totalPolls: pollsRes.count || 0,
      totalSmsAlerts: smsRes.count || 0,
      pendingIncidents: pendingIncidents.count || 0,
      pendingDocuments: pendingDocuments.count || 0,
      activePolls: activePolls.count || 0,
      activeUsers: activeUsers.count || 0,
      verifiedUsers: verifiedUsers.count || 0,
      recentIncidents: recentIncidents.data || [],
      recentDocuments: recentDocuments.data || [],
      recentUsers: recentUsers.data || [],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// List incidents (admin)
router.get("/incidents", async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("incidents").select("*, profiles:user_id(first_name, last_name, email)", { count: "exact" });

    if (req.query.status) query = query.eq("status", req.query.status as string);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({ incidents: data, currentPage: page, totalPages: Math.ceil((count || 0) / limit), total: count || 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update incident
router.patch("/incidents/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { status, admin_notes } = req.body;

    const { data: existing, error: fetchError } = await supabase
      .from("incidents")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (fetchError || !existing) {
      return res.status(404).json({ message: "Incident not found" });
    }

    const updateData: Record<string, any> = {};
    if (status) updateData.status = status;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;

    const { data, error } = await supabase
      .from("incidents")
      .update(updateData)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    // Create notification if status changed
    if (status && status !== existing.status) {
      await supabase.from("notifications").insert({
        user_id: existing.user_id,
        type: "incident_update",
        title: "Incident Status Updated",
        message: `Your incident report has been updated to ${status}`,
        priority: status === "resolved" ? "high" : "medium",
        related_entity_type: "incident",
        related_entity_id: existing.id,
        action_url: "/report-incident",
      });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete incident
router.delete("/incidents/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase.from("incidents").delete().eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Incident deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// List documents (admin)
router.get("/documents", async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("document_requests").select("*, profiles:user_id(first_name, last_name, email)", { count: "exact" });

    if (req.query.status) query = query.eq("status", req.query.status as string);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({ documents: data, currentPage: page, totalPages: Math.ceil((count || 0) / limit), total: count || 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update document
router.patch("/documents/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { status, admin_notes } = req.body;

    const { data: existing, error: fetchError } = await supabase
      .from("document_requests")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (fetchError || !existing) {
      return res.status(404).json({ message: "Document request not found" });
    }

    const updateData: Record<string, any> = {};
    if (status) updateData.status = status;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;

    const { data, error } = await supabase
      .from("document_requests")
      .update(updateData)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    // Add status history
    await supabase.from("document_status_history").insert({
      document_request_id: req.params.id,
      status: status || existing.status,
      note: admin_notes || "",
      updated_by: req.user!.id,
    });

    // Create notification if status changed
    if (status && status !== existing.status) {
      const statusMessages: Record<string, string> = {
        processing: "is now being processed",
        approved: "has been approved and is being prepared",
        ready: "is ready for pickup at the barangay office",
        claimed: "has been marked as claimed",
        rejected: "has been rejected",
      };

      await supabase.from("notifications").insert({
        user_id: existing.user_id,
        type: "document_update",
        title: "Document Request Update",
        message: `Your document request ${statusMessages[status] || "has been updated"}`,
        priority: ["ready", "rejected"].includes(status) ? "high" : "medium",
        related_entity_type: "document",
        related_entity_id: existing.id,
        action_url: "/request-document",
      });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete document
router.delete("/documents/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase.from("document_requests").delete().eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Document deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// List users (admin)
router.get("/users", async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("profiles").select("*", { count: "exact" }).eq("role", "user");

    if (req.query.search) {
      const search = req.query.search as string;
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (req.query.isActive) {
      query = query.eq("is_active", req.query.isActive === "true");
    }

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({ users: data, currentPage: page, totalPages: Math.ceil((count || 0) / limit), total: count || 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get user details (admin)
router.get("/users/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", req.params.id)
      .single();

    if (userError || !user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [incidentsRes, documentsRes] = await Promise.all([
      supabase.from("incidents").select("*").eq("user_id", req.params.id).order("created_at", { ascending: false }),
      supabase.from("document_requests").select("*").eq("user_id", req.params.id).order("created_at", { ascending: false }),
    ]);

    res.json({
      user,
      incidents: incidentsRes.data || [],
      documents: documentsRes.data || [],
      stats: { totalIncidents: incidentsRes.data?.length || 0, totalDocuments: documentsRes.data?.length || 0 },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update user (admin)
router.patch("/users/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { role, is_active, phone, address, is_verified, verification_status, verification_notes, verification_date } = req.body;

    const updateData: Record<string, any> = {};
    if (role !== undefined) updateData.role = role;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (is_verified !== undefined) updateData.is_verified = is_verified;
    if (verification_status !== undefined) updateData.verification_status = verification_status;
    if (verification_notes !== undefined) updateData.verification_notes = verification_notes;
    if (verification_date !== undefined) updateData.verification_date = verification_date;

    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("user_id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    // Create notification for verification status change
    if (verification_status !== undefined) {
      const statusMessages: Record<string, string> = {
        approved: "Your resident verification has been approved!",
        rejected: "Your resident verification was rejected. Please check the notes for details.",
        pending: "Your resident verification is pending review.",
      };

      await supabase.from("notifications").insert({
        user_id: req.params.id,
        type: "system",
        title: "Verification Status Updated",
        message: statusMessages[verification_status] || "Your verification status has been updated",
        priority: "high",
        related_entity_type: "none",
        action_url: "/profile",
      });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Deactivate user (admin)
router.delete("/users/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ is_active: false })
      .eq("user_id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "User deactivated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
