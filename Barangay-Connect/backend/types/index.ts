export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  role: "user" | "admin";
  is_active: boolean;
  is_verified: boolean;
  verification_status: "pending" | "approved" | "rejected";
  verification_notes: string;
  verification_date: string | null;
  profile_picture: string | null;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}
