import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_verified: boolean;
  } | null;
}

interface JwtPayload {
  sub: string;
  email?: string;
  role?: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
}

// Verify Supabase JWT and attach user profile
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the JWT using Supabase's JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

    // Get user ID from the token (Supabase uses 'sub' claim)
    const userId = decoded.sub;

    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Fetch user profile from profiles table
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !profile) {
      return res.status(401).json({ message: "User profile not found" });
    }

    if (!profile.is_active) {
      return res.status(403).json({ message: "Account has been deactivated" });
    }

    req.user = {
      id: profile.user_id,
      email: profile.email,
      role: profile.role,
      first_name: profile.first_name,
      last_name: profile.last_name,
      is_active: profile.is_active,
      is_verified: profile.is_verified,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Optional authentication - extracts user if token exists but doesn't reject if missing
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
      const userId = decoded.sub;

      if (userId) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (profile && profile.is_active) {
          req.user = {
            id: profile.user_id,
            email: profile.email,
            role: profile.role,
            first_name: profile.first_name,
            last_name: profile.last_name,
            is_active: profile.is_active,
            is_verified: profile.is_verified,
          };
        }
      }
    } catch {
      // Token invalid, continue without user
    }
  }

  next();
};

// Admin middleware
export const admin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void | Response => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
