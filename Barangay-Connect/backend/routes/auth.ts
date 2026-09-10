import express, { Request, Response } from "express";
import multer from "multer";
import { supabase } from "../config/supabase";
import { protect, AuthRequest } from "../middleware/auth";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const verificationUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only image and PDF files are allowed"));
    }
  },
});

// Get current user profile
router.get("/me", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", req.user!.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get verification documents
    const { data: docs } = await supabase
      .from("verification_documents")
      .select("*")
      .eq("user_id", req.user!.id)
      .order("uploaded_at", { ascending: false });

    res.json({ ...data, verificationDocuments: docs || [] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.patch("/update-profile", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { first_name, last_name, phone, address } = req.body;

    const updateData: Record<string, any> = {};
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;

    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("user_id", req.user!.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Change password (via Supabase Auth)
router.post("/change-password", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Note: Supabase handles password changes via the client SDK
    // This endpoint is kept for API compatibility but the frontend should use
    // supabase.auth.updateUser({ password: newPassword }) directly
    res.json({
      message: "Password change should be done via Supabase client SDK",
      hint: "Use supabase.auth.updateUser({ password: newPassword })",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Upload profile picture to Supabase Storage
router.post(
  "/upload-profile-picture",
  protect,
  upload.single("profilePicture"),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const userId = req.user!.id;
      const fileExt = req.file.originalname.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ profile_picture: urlData.publicUrl })
        .eq("user_id", userId);

      if (updateError) throw updateError;

      res.json({ profile_picture: urlData.publicUrl });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Submit verification documents
router.post(
  "/submit-verification",
  protect,
  verificationUpload.array("verificationDocuments", 10),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const userId = req.user!.id;
      const files = req.files as Express.Multer.File[];

      // Delete existing verification documents
      await supabase.from("verification_documents").delete().eq("user_id", userId);

      // Upload each file to Supabase Storage
      const docRecords = [];
      for (const file of files) {
        const fileExt = file.originalname.split(".").pop();
        const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("verification-docs")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("verification-docs")
          .getPublicUrl(fileName);

        docRecords.push({
          user_id: userId,
          file_url: urlData.publicUrl,
          file_name: file.originalname,
          document_type: file.mimetype,
        });
      }

      // Insert document records
      const { error: insertError } = await supabase
        .from("verification_documents")
        .insert(docRecords);

      if (insertError) throw insertError;

      // Update verification status
      await supabase
        .from("profiles")
        .update({ verification_status: "pending" })
        .eq("user_id", userId);

      res.json({ message: "Verification documents submitted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get user's verification documents
router.get("/verification-documents", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("verification_documents")
      .select("*")
      .eq("user_id", req.user!.id)
      .order("uploaded_at", { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
