import express, { Response } from "express";
import { supabase } from "../config/supabase";
import { protect, optionalAuth, AuthRequest } from "../middleware/auth";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.split(".").pop()?.toLowerCase() || "");
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only image files are allowed"));
  },
});

// List incidents
router.get("/", optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("incidents").select("*, profiles:user_id(first_name, last_name, email)", { count: "exact" });

    if (req.user) {
      if (req.user.role !== "admin") {
        query = query.eq("user_id", req.user.id);
      }
    } else {
      query = query.eq("status", "resolved");
    }

    if (req.query.status) query = query.eq("status", req.query.status as string);
    if (req.query.type) query = query.eq("type", req.query.type as string);
    if (req.query.priority) query = query.eq("priority", req.query.priority as string);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({
      incidents: data,
      pagination: { page, limit, total: count || 0, pages: Math.ceil((count || 0) / limit) },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create incident
router.post("/", protect, upload.single("photo"), async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, location, type, priority } = req.body;
    let photoUrl = null;

    if (req.file) {
      const fileName = `${req.user!.id}/${Date.now()}.${req.file.originalname.split(".").pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("incident-photos")
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("incident-photos")
        .getPublicUrl(fileName);
      photoUrl = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from("incidents")
      .insert({
        user_id: req.user!.id,
        title,
        description,
        location,
        type: type || "other",
        priority: priority || "medium",
        photo_url: photoUrl,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's incidents
router.get("/my", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("incidents")
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

// Get incident by ID
router.get("/:id", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("incidents")
      .select("*, profiles:user_id(first_name, last_name, email)")
      .eq("id", req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // Check ownership or admin
    if (data.user_id !== req.user!.id && req.user!.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
