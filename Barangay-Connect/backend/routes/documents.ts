import express, { Response } from "express";
import { supabase } from "../config/supabase";
import { protect, AuthRequest } from "../middleware/auth";

const router = express.Router();

// Create document request
router.post("/", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { documentType, purpose, notes } = req.body;

    const { data, error } = await supabase
      .from("document_requests")
      .insert({
        user_id: req.user!.id,
        document_type: documentType,
        purpose,
        notes,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's document requests
router.get("/my", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("document_requests")
      .select("*")
      .eq("user_id", req.user!.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all documents (for regular users - their own)
router.get("/", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("document_requests")
      .select("*")
      .eq("user_id", req.user!.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get document request by ID
router.get("/:id", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("document_requests")
      .select("*, profiles:user_id(first_name, last_name, email)")
      .eq("id", req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (data.user_id !== req.user!.id && req.user!.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Get status history
    const { data: history } = await supabase
      .from("document_status_history")
      .select("*")
      .eq("document_request_id", req.params.id)
      .order("updated_at", { ascending: false });

    res.json({ ...data, statusHistory: history || [] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
