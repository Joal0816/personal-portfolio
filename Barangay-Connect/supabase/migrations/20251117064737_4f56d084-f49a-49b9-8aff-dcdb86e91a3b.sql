-- ============================================
-- BARANGAY CONNECT - COMPLETE DATABASE SCHEMA
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verification_notes TEXT DEFAULT '',
  verification_date TIMESTAMPTZ,
  profile_picture TEXT,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- VERIFICATION DOCUMENTS TABLE
-- ============================================
CREATE TABLE public.verification_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  document_type TEXT DEFAULT '',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INCIDENTS TABLE
-- ============================================
CREATE TABLE public.incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'other' CHECK (type IN ('crime', 'public-safety', 'infrastructure', 'health', 'environment', 'noise', 'other')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- DOCUMENT REQUESTS TABLE
-- ============================================
CREATE TABLE public.document_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  purpose TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'approved', 'rejected', 'ready', 'claimed')),
  admin_notes TEXT DEFAULT '',
  estimated_completion TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- DOCUMENT REQUEST STATUS HISTORY
-- ============================================
CREATE TABLE public.document_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_request_id UUID NOT NULL REFERENCES public.document_requests(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'event', 'announcement', 'alert', 'update')),
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  publish_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expiry_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ANNOUNCEMENT READ STATUS
-- ============================================
CREATE TABLE public.announcement_read_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  announcement_id UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(announcement_id, user_id)
);

-- ============================================
-- POLLS TABLE
-- ============================================
CREATE TABLE public.polls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'poll' CHECK (type IN ('poll', 'survey', 'consultation', 'vote')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed', 'archived')),
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- POLL QUESTIONS TABLE
-- ============================================
CREATE TABLE public.poll_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID NOT NULL REFERENCES public.polls(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'single' CHECK (question_type IN ('single', 'multiple', 'text')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- POLL OPTIONS TABLE
-- ============================================
CREATE TABLE public.poll_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.poll_questions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- POLL RESPONSES TABLE (who voted)
-- ============================================
CREATE TABLE public.poll_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID NOT NULL REFERENCES public.polls(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(poll_id, user_id)
);

-- ============================================
-- POLL ANSWERS TABLE (individual answers)
-- ============================================
CREATE TABLE public.poll_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  response_id UUID NOT NULL REFERENCES public.poll_responses(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.poll_questions(id) ON DELETE CASCADE,
  selected_option_ids UUID[] DEFAULT '{}',
  text_answer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('incident_update', 'document_update', 'poll', 'poll_created', 'poll_closing', 'announcement', 'sms', 'system', 'reminder')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,
  related_entity_type TEXT DEFAULT 'none' CHECK (related_entity_type IN ('incident', 'document', 'poll', 'sms', 'user', 'announcement', 'none')),
  related_entity_id UUID,
  metadata JSONB DEFAULT '{}',
  action_url TEXT,
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- SMS ALERTS TABLE
-- ============================================
CREATE TABLE public.sms_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'announcement' CHECK (type IN ('emergency', 'announcement', 'reminder', 'update')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  recipients TEXT NOT NULL DEFAULT 'all' CHECK (recipients IN ('all', 'active', 'specific')),
  sent_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sent_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'failed')),
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- SMS ALERT RECIPIENTS TABLE
-- ============================================
CREATE TABLE public.sms_alert_recipients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sms_alert_id UUID NOT NULL REFERENCES public.sms_alerts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  UNIQUE(sms_alert_id, user_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_email ON public.profiles(email);

CREATE INDEX idx_incidents_user_id ON public.incidents(user_id);
CREATE INDEX idx_incidents_status ON public.incidents(status);
CREATE INDEX idx_incidents_created_at ON public.incidents(created_at DESC);
CREATE INDEX idx_incidents_type ON public.incidents(type);

CREATE INDEX idx_document_requests_user_id ON public.document_requests(user_id);
CREATE INDEX idx_document_requests_status ON public.document_requests(status);
CREATE INDEX idx_document_requests_created_at ON public.document_requests(created_at DESC);

CREATE INDEX idx_announcements_is_active ON public.announcements(is_active);
CREATE INDEX idx_announcements_is_pinned ON public.announcements(is_pinned DESC);
CREATE INDEX idx_announcements_category ON public.announcements(category);
CREATE INDEX idx_announcements_created_at ON public.announcements(created_at DESC);
CREATE INDEX idx_announcements_compound ON public.announcements(is_active, is_pinned DESC, created_at DESC);
CREATE INDEX idx_announcements_search ON public.announcements USING gin(title gin_trgm_ops);
CREATE INDEX idx_announcements_search_content ON public.announcements USING gin(content gin_trgm_ops);

CREATE INDEX idx_polls_status ON public.polls(status);
CREATE INDEX idx_polls_is_deleted ON public.polls(is_deleted);
CREATE INDEX idx_polls_created_at ON public.polls(created_at DESC);
CREATE INDEX idx_polls_created_by ON public.polls(created_by);

CREATE INDEX idx_poll_questions_poll_id ON public.poll_questions(poll_id);
CREATE INDEX idx_poll_options_question_id ON public.poll_options(question_id);
CREATE INDEX idx_poll_responses_poll_id ON public.poll_responses(poll_id);
CREATE INDEX idx_poll_responses_user_id ON public.poll_responses(user_id);
CREATE INDEX idx_poll_answers_response_id ON public.poll_answers(response_id);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_type ON public.notifications(type);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, is_read) WHERE is_read = false;

CREATE INDEX idx_sms_alerts_sent_by ON public.sms_alerts(sent_by);
CREATE INDEX idx_sms_alerts_status ON public.sms_alerts(status);
CREATE INDEX idx_sms_alerts_created_at ON public.sms_alerts(created_at DESC);

CREATE INDEX idx_verification_documents_user_id ON public.verification_documents(user_id);
CREATE INDEX idx_announcement_read_status_user ON public.announcement_read_status(user_id);
CREATE INDEX idx_announcement_read_status_announcement ON public.announcement_read_status(announcement_id);
CREATE INDEX idx_document_status_history_document ON public.document_status_history(document_request_id);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_incidents_updated_at
BEFORE UPDATE ON public.incidents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_document_requests_updated_at
BEFORE UPDATE ON public.document_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_polls_updated_at
BEFORE UPDATE ON public.polls
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, phone, address, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    COALESCE(new.raw_user_meta_data->>'address', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'user')
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('incident-photos', 'incident-photos', true),
  ('profile-pictures', 'profile-pictures', true),
  ('verification-docs', 'verification-docs', false),
  ('announcement-attachments', 'announcement-attachments', true);

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Incident photos: public read, authenticated upload
CREATE POLICY "Incident photos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'incident-photos');

CREATE POLICY "Authenticated users can upload incident photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'incident-photos' AND auth.role() = 'authenticated');

-- Profile pictures: public read, owner write
CREATE POLICY "Profile pictures are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can upload their own profile picture"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own profile picture"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile picture"
ON storage.objects FOR DELETE
USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Verification docs: owner read/write, admin read
CREATE POLICY "Users can view their own verification docs"
ON storage.objects FOR SELECT
USING (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own verification docs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own verification docs"
ON storage.objects FOR DELETE
USING (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Announcement attachments: public read, admin write
CREATE POLICY "Announcement attachments are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'announcement-attachments');

CREATE POLICY "Authenticated users can upload announcement attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'announcement-attachments' AND auth.role() = 'authenticated');

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- VERIFICATION DOCUMENTS
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own verification documents"
ON public.verification_documents FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verification documents"
ON public.verification_documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own verification documents"
ON public.verification_documents FOR DELETE
USING (auth.uid() = user_id);

-- INCIDENTS
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all incidents"
ON public.incidents FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create incidents"
ON public.incidents FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own incidents"
ON public.incidents FOR UPDATE
USING (auth.uid() = user_id);

-- DOCUMENT REQUESTS
ALTER TABLE public.document_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own document requests"
ON public.document_requests FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create document requests"
ON public.document_requests FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own document requests"
ON public.document_requests FOR UPDATE
USING (auth.uid() = user_id);

-- DOCUMENT STATUS HISTORY
ALTER TABLE public.document_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view status history of their documents"
ON public.document_status_history FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.document_requests dr
    WHERE dr.id = document_status_history.document_request_id
    AND dr.user_id = auth.uid()
  )
);

-- ANNOUNCEMENTS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active announcements"
ON public.announcements FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all announcements"
ON public.announcements FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can create announcements"
ON public.announcements FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update announcements"
ON public.announcements FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete announcements"
ON public.announcements FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- ANNOUNCEMENT READ STATUS
ALTER TABLE public.announcement_read_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own read status"
ON public.announcement_read_status FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can mark announcements as read"
ON public.announcement_read_status FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- POLLS
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active non-deleted polls"
ON public.polls FOR SELECT
USING (status IN ('active', 'closed') AND is_deleted = false);

CREATE POLICY "Admins can view all polls"
ON public.polls FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can create polls"
ON public.polls FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update polls"
ON public.polls FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete polls"
ON public.polls FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- POLL QUESTIONS
ALTER TABLE public.poll_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view poll questions"
ON public.poll_questions FOR SELECT
USING (true);

CREATE POLICY "Admins can manage poll questions"
ON public.poll_questions FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- POLL OPTIONS
ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view poll options"
ON public.poll_options FOR SELECT
USING (true);

CREATE POLICY "Admins can manage poll options"
ON public.poll_options FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- POLL RESPONSES
ALTER TABLE public.poll_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own poll responses"
ON public.poll_responses FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all poll responses"
ON public.poll_responses FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Authenticated users can submit poll responses"
ON public.poll_responses FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- POLL ANSWERS
ALTER TABLE public.poll_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own poll answers"
ON public.poll_answers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.poll_responses pr
    WHERE pr.id = poll_answers.response_id
    AND pr.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all poll answers"
ON public.poll_answers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Authenticated users can insert poll answers"
ON public.poll_answers FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.poll_responses pr
    WHERE pr.id = poll_answers.response_id
    AND pr.user_id = auth.uid()
  )
);

-- NOTIFICATIONS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
ON public.notifications FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert notifications"
ON public.notifications FOR INSERT
WITH CHECK (true);

-- SMS ALERTS
ALTER TABLE public.sms_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view SMS alerts sent to them"
ON public.sms_alerts FOR SELECT
USING (
  recipients = 'all'
  OR (
    recipients = 'active'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.is_active = true
    )
  )
  OR (
    recipients = 'specific'
    AND EXISTS (
      SELECT 1 FROM public.sms_alert_recipients sar
      WHERE sar.sms_alert_id = sms_alerts.id
      AND sar.user_id = auth.uid()
    )
  )
  OR sent_by = auth.uid()
);

CREATE POLICY "Admins can manage SMS alerts"
ON public.sms_alerts FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- SMS ALERT RECIPIENTS
ALTER TABLE public.sms_alert_recipients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view SMS alert recipients"
ON public.sms_alert_recipients FOR SELECT
USING (true);

CREATE POLICY "Admins can manage SMS alert recipients"
ON public.sms_alert_recipients FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- ============================================
-- RPC FUNCTIONS
-- ============================================

-- Function to increment vote count on poll options
CREATE OR REPLACE FUNCTION public.increment_vote(option_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.poll_options
  SET votes = votes + 1
  WHERE id = option_id;
END;
$$;
