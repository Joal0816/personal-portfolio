export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          address: string | null
          role: string
          is_active: boolean
          is_verified: boolean
          verification_status: string
          verification_notes: string
          verification_date: string | null
          profile_picture: string | null
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          address?: string | null
          role?: string
          is_active?: boolean
          is_verified?: boolean
          verification_status?: string
          verification_notes?: string
          verification_date?: string | null
          profile_picture?: string | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          address?: string | null
          role?: string
          is_active?: boolean
          is_verified?: boolean
          verification_status?: string
          verification_notes?: string
          verification_date?: string | null
          profile_picture?: string | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      incidents: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          location: string
          type: string
          priority: string
          photo_url: string | null
          status: string
          admin_notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          location: string
          type?: string
          priority?: string
          photo_url?: string | null
          status?: string
          admin_notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          location?: string
          type?: string
          priority?: string
          photo_url?: string | null
          status?: string
          admin_notes?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      document_requests: {
        Row: {
          id: string
          user_id: string
          document_type: string
          purpose: string
          notes: string | null
          status: string
          admin_notes: string
          estimated_completion: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          document_type: string
          purpose: string
          notes?: string | null
          status?: string
          admin_notes?: string
          estimated_completion?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          document_type?: string
          purpose?: string
          notes?: string | null
          status?: string
          admin_notes?: string
          estimated_completion?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          is_pinned: boolean
          priority: string
          created_by: string
          is_active: boolean
          publish_date: string
          expiry_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category?: string
          is_pinned?: boolean
          priority?: string
          created_by: string
          is_active?: boolean
          publish_date?: string
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string
          is_pinned?: boolean
          priority?: string
          created_by?: string
          is_active?: boolean
          publish_date?: string
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      polls: {
        Row: {
          id: string
          title: string
          description: string
          type: string
          status: string
          start_date: string
          end_date: string
          created_by: string
          is_anonymous: boolean
          is_deleted: boolean
          deleted_at: string | null
          deleted_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type?: string
          status?: string
          start_date?: string
          end_date?: string
          created_by: string
          is_anonymous?: boolean
          is_deleted?: boolean
          deleted_at?: string | null
          deleted_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: string
          status?: string
          start_date?: string
          end_date?: string
          created_by?: string
          is_anonymous?: boolean
          is_deleted?: boolean
          deleted_at?: string | null
          deleted_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          priority: string
          is_read: boolean
          read_at: string | null
          related_entity_type: string
          related_entity_id: string | null
          metadata: Json | null
          action_url: string | null
          admin_notes: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message: string
          priority?: string
          is_read?: boolean
          read_at?: string | null
          related_entity_type?: string
          related_entity_id?: string | null
          metadata?: Json | null
          action_url?: string | null
          admin_notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          message?: string
          priority?: string
          is_read?: boolean
          read_at?: string | null
          related_entity_type?: string
          related_entity_id?: string | null
          metadata?: Json | null
          action_url?: string | null
          admin_notes?: string
          created_at?: string
        }
        Relationships: []
      }
      sms_alerts: {
        Row: {
          id: string
          title: string
          message: string
          type: string
          priority: string
          recipients: string
          sent_by: string
          sent_count: number
          status: string
          scheduled_for: string | null
          sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          message: string
          type?: string
          priority?: string
          recipients?: string
          sent_by: string
          sent_count?: number
          status?: string
          scheduled_for?: string | null
          sent_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          message?: string
          type?: string
          priority?: string
          recipients?: string
          sent_by?: string
          sent_count?: number
          status?: string
          scheduled_for?: string | null
          sent_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          id: string
          user_id: string
          file_url: string
          file_name: string
          document_type: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_url: string
          file_name: string
          document_type?: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_url?: string
          file_name?: string
          document_type?: string
          uploaded_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_vote: {
        Args: { option_id: string }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
