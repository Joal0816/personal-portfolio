import express, { Response } from "express";
import { supabase } from "../config/supabase";
import { protect, admin, AuthRequest } from "../middleware/auth";

const router = express.Router();

// List SMS alerts
router.get("/", protect, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("sms_alerts")
      .select("*, profiles:sent_by(first_name, last_name, email, role)", { count: "exact" });

    if (req.user!.role !== "admin") {
      query = query.or(`recipients.eq.all,and(recipients.eq.active,profiles.is_active.eq.true),id.in.(select sms_alert_id from sms_alert_recipients where user_id='${req.user!.id}'),sent_by.eq.${req.user!.id}`);
    }

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({ alerts: data, total: count || 0, page, pages: Math.ceil((count || 0) / limit) });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Send SMS alert (admin)
router.post("/send", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, message, type, priority, recipients, specificRecipients } = req.body;

    // Create SMS alert
    const { data: smsAlert, error: smsError } = await supabase
      .from("sms_alerts")
      .insert({
        title,
        message,
        type: type || "announcement",
        priority: priority || "medium",
        recipients: recipients || "all",
        sent_by: req.user!.id,
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (smsError) throw smsError;

    // Add specific recipients
    if (recipients === "specific" && specificRecipients) {
      const recipientRecords = specificRecipients.map((userId: string) => ({
        sms_alert_id: smsAlert.id,
        user_id: userId,
      }));
      await supabase.from("sms_alert_recipients").insert(recipientRecords);
    }

    // Count recipients
    let recipientCount = 0;
    if (recipients === "all") {
      const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "user");
      recipientCount = count || 0;
    } else if (recipients === "active") {
      const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "user").eq("is_active", true);
      recipientCount = count || 0;
    } else if (recipients === "specific") {
      recipientCount = specificRecipients?.length || 0;
    }

    await supabase.from("sms_alerts").update({ sent_count: recipientCount }).eq("id", smsAlert.id);

    // Create notifications for recipients
    let userIds: string[] = [];
    if (recipients === "all") {
      const { data: users } = await supabase.from("profiles").select("user_id").eq("role", "user");
      userIds = users?.map((u) => u.user_id) || [];
    } else if (recipients === "active") {
      const { data: users } = await supabase.from("profiles").select("user_id").eq("role", "user").eq("is_active", true);
      userIds = users?.map((u) => u.user_id) || [];
    } else {
      userIds = specificRecipients || [];
    }

    if (userIds.length > 0) {
      const notifications = userIds.map((userId) => ({
        user_id: userId,
        type: "sms",
        title,
        message,
        priority: priority || "medium",
        related_entity_type: "sms",
        related_entity_id: smsAlert.id,
        action_url: "/notifications",
      }));
      await supabase.from("notifications").insert(notifications);
    }

    res.status(201).json({
      success: true,
      message: `SMS alert sent to ${recipientCount} recipients`,
      alert: smsAlert,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get SMS alert by ID
router.get("/:id", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { data: alert, error } = await supabase
      .from("sms_alerts")
      .select("*, profiles:sent_by(first_name, last_name, email)")
      .eq("id", req.params.id)
      .single();

    if (error || !alert) {
      return res.status(404).json({ message: "SMS alert not found" });
    }

    // Get recipients
    let recipients: any[] = [];
    if (alert.recipients === "specific") {
      const { data: recipientList } = await supabase
        .from("sms_alert_recipients")
        .select("profiles:user_id(first_name, last_name, phone, profile_picture)")
        .eq("sms_alert_id", alert.id);

      recipients = (recipientList || []).map((r) => ({
        ...r.profiles,
        status: alert.status === "sent" ? "sent" : "pending",
      }));
    }

    res.json({ ...alert, recipients });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update SMS alert
router.put("/:id", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, message, type, priority } = req.body;

    const { data, error } = await supabase
      .from("sms_alerts")
      .update({ title, message, type, priority })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: "SMS alert updated successfully", alert: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete SMS alert
router.delete("/:id", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase.from("sms_alerts").delete().eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "SMS alert deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
