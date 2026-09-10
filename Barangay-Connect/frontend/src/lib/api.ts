import { supabase } from "@/integrations/supabase/client";

// ============================================
// AUTH API - Direct Supabase Auth
// ============================================
export const auth = {
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });
    if (error) throw error;

    // Fetch profile created by trigger
    if (authData.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", authData.user.id)
        .single();
      return profile || authData.user;
    }
    return authData.user;
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // Fetch full profile
    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .single();
      return profile || data.user;
    }
    return data.user;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) throw error;
    return profile;
  },

  getStoredUser: () => null,
  getToken: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  },
  isAuthenticated: async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },

  forgotPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { success: true };
  },

  resetPassword: async (token: string, password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return { success: true };
  },

  updateProfile: async (data: { first_name?: string; last_name?: string; phone?: string; address?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: profile, error } = await supabase
      .from("profiles")
      .update(data)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return profile;
  },

  uploadProfilePicture: async (file: File) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, file, { contentType: file.mimetype, upsert: true });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(fileName);

    await supabase
      .from("profiles")
      .update({ profile_picture: urlData.publicUrl })
      .eq("user_id", user.id);

    return { profile_picture: urlData.publicUrl };
  },

  submitVerification: async (files: File[]) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Delete existing
    await supabase.from("verification_documents").delete().eq("user_id", user.id);

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error } = await supabase.storage
        .from("verification-docs")
        .upload(fileName, file, { contentType: file.mimetype });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("verification-docs")
        .getPublicUrl(fileName);

      await supabase.from("verification_documents").insert({
        user_id: user.id,
        file_url: urlData.publicUrl,
        file_name: file.originalname,
        document_type: file.mimetype,
      });
    }

    await supabase
      .from("profiles")
      .update({ verification_status: "pending" })
      .eq("user_id", user.id);

    return { message: "Verification documents submitted" };
  },

  getVerificationDocuments: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("verification_documents")
      .select("*")
      .eq("user_id", user.id)
      .order("uploaded_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};

// ============================================
// INCIDENTS API
// ============================================
export const incidents = {
  create: async (data: FormData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const location = data.get("location") as string;
    const type = data.get("type") as string;
    const priority = data.get("priority") as string;
    const photo = data.get("photo") as File | null;

    let photoUrl = null;
    if (photo && photo.size > 0) {
      const fileName = `${user.id}/${Date.now()}.${photo.name.split(".").pop()}`;
      const { error } = await supabase.storage
        .from("incident-photos")
        .upload(fileName, photo, { contentType: photo.mimetype });
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("incident-photos")
        .getPublicUrl(fileName);
      photoUrl = urlData.publicUrl;
    }

    const { data: incident, error } = await supabase
      .from("incidents")
      .insert({
        user_id: user.id,
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
    return incident;
  },

  getAll: async (page = 1, limit = 10) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
      .from("incidents")
      .select("*, profiles:user_id(first_name, last_name, email)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { incidents: data, total: count || 0 };
  },

  getMyIncidents: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("incidents")
      .select("*, profiles:user_id(first_name, last_name, email)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};

// ============================================
// DOCUMENTS API
// ============================================
export const documents = {
  create: async (data: { documentType: string; purpose: string; notes?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: doc, error } = await supabase
      .from("document_requests")
      .insert({
        user_id: user.id,
        document_type: data.documentType,
        purpose: data.purpose,
        notes: data.notes,
      })
      .select()
      .single();

    if (error) throw error;
    return doc;
  },

  getAll: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("document_requests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getMyRequests: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("document_requests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("document_requests")
      .select("*, profiles:user_id(first_name, last_name, email)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};

// ============================================
// ADMIN API
// ============================================
export const admin = {
  getStats: async () => {
    const [users, incidents, documents, polls, sms, pendingIncidents, pendingDocuments, activePolls] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "user"),
      supabase.from("incidents").select("*", { count: "exact", head: true }),
      supabase.from("document_requests").select("*", { count: "exact", head: true }),
      supabase.from("polls").select("*", { count: "exact", head: true }).eq("is_deleted", false),
      supabase.from("sms_alerts").select("*", { count: "exact", head: true }).eq("status", "sent"),
      supabase.from("incidents").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("document_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("polls").select("*", { count: "exact", head: true }).eq("status", "active").eq("is_deleted", false),
    ]);

    return {
      totalUsers: users.count || 0,
      totalIncidents: incidents.count || 0,
      totalDocuments: documents.count || 0,
      totalPolls: polls.count || 0,
      totalSmsAlerts: sms.count || 0,
      pendingIncidents: pendingIncidents.count || 0,
      pendingDocuments: pendingDocuments.count || 0,
      activePolls: activePolls.count || 0,
    };
  },

  getUsers: async (page = 1, limit = 10, search = "") => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("profiles").select("*", { count: "exact" }).eq("role", "user");

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { users: data, total: count || 0 };
  },

  updateUser: async (id: string, data: any) => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .update(data)
      .eq("user_id", id)
      .select()
      .single();

    if (error) throw error;
    return profile;
  },

  deleteUser: async (id: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_active: false })
      .eq("user_id", id);

    if (error) throw error;
  },

  getIncidents: async (page = 1, limit = 10, status?: string) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("incidents").select("*, profiles:user_id(first_name, last_name, email)", { count: "exact" });
    if (status) query = query.eq("status", status);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { incidents: data, total: count || 0 };
  },

  getDocuments: async (page = 1, limit = 10, status?: string) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("document_requests").select("*, profiles:user_id(first_name, last_name, email)", { count: "exact" });
    if (status) query = query.eq("status", status);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { documents: data, total: count || 0 };
  },

  updateIncidentStatus: async (id: string, status: string, admin_notes?: string) => {
    const { data, error } = await supabase
      .from("incidents")
      .update({ status, admin_notes })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateDocumentStatus: async (id: string, status: string, admin_notes?: string) => {
    const { data, error } = await supabase
      .from("document_requests")
      .update({ status, admin_notes })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// ============================================
// SMS API
// ============================================
export const sms = {
  getAll: async (page = 1, limit = 10) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
      .from("sms_alerts")
      .select("*, profiles:sent_by(first_name, last_name, email)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { alerts: data, total: count || 0 };
  },

  send: async (data: { title: string; message: string; type?: string; priority?: string; recipients?: string; specificRecipients?: string[] }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: alert, error } = await supabase
      .from("sms_alerts")
      .insert({
        title: data.title,
        message: data.message,
        type: data.type || "announcement",
        priority: data.priority || "medium",
        recipients: data.recipients || "all",
        sent_by: user.id,
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Create notifications for all users
    const { data: users } = await supabase.from("profiles").select("user_id").eq("role", "user");
    if (users && users.length > 0) {
      const notifications = users.map((u) => ({
        user_id: u.user_id,
        type: "sms",
        title: data.title,
        message: data.message,
        priority: data.priority || "medium",
        related_entity_type: "sms",
        related_entity_id: alert.id,
        action_url: "/notifications",
      }));
      await supabase.from("notifications").insert(notifications);
    }

    return alert;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("sms_alerts")
      .select("*, profiles:sent_by(first_name, last_name, email)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("sms_alerts").delete().eq("id", id);
    if (error) throw error;
  },
};

// ============================================
// POLLS API
// ============================================
export const polls = {
  getAll: async (page = 1, limit = 50, status?: string) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("polls")
      .select("*, profiles:created_by(first_name, last_name)", { count: "exact" })
      .eq("is_deleted", false);

    if (status) query = query.eq("status", status);

    const { data: pollsList, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Enrich with questions and vote info
    const enriched = await Promise.all(
      (pollsList || []).map(async (poll) => {
        const { data: questions } = await supabase
          .from("poll_questions")
          .select("*, poll_options(*)")
          .eq("poll_id", poll.id)
          .order("sort_order");

        const { count: responseCount } = await supabase
          .from("poll_responses")
          .select("*", { count: "exact", head: true })
          .eq("poll_id", poll.id);

        const { data: { user } } = await supabase.auth.getUser();
        let hasVoted = false;
        if (user && !poll.is_anonymous) {
          const { data: existing } = await supabase
            .from("poll_responses")
            .select("id")
            .eq("poll_id", poll.id)
            .eq("user_id", user.id)
            .maybeSingle();
          hasVoted = !!existing;
        }

        return {
          ...poll,
          questions: questions || [],
          totalResponses: responseCount || 0,
          hasVoted,
          canVote: poll.status === "active" && !hasVoted,
        };
      })
    );

    return { polls: enriched, total: count || 0 };
  },

  getById: async (id: string) => {
    const { data: poll, error } = await supabase
      .from("polls")
      .select("*, profiles:created_by(first_name, last_name)")
      .eq("id", id)
      .single();

    if (error) throw error;

    const { data: questions } = await supabase
      .from("poll_questions")
      .select("*, poll_options(*)")
      .eq("poll_id", poll.id)
      .order("sort_order");

    const { count: responseCount } = await supabase
      .from("poll_responses")
      .select("*", { count: "exact", head: true })
      .eq("poll_id", poll.id);

    return { ...poll, questions: questions || [], totalResponses: responseCount || 0 };
  },

  create: async (data: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: poll, error } = await supabase
      .from("polls")
      .insert({
        title: data.title,
        description: data.description,
        type: data.type || "poll",
        status: "active",
        start_date: data.startDate || new Date().toISOString(),
        end_date: data.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        is_anonymous: data.isAnonymous || false,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Create questions
    if (data.questions) {
      for (let i = 0; i < data.questions.length; i++) {
        const q = data.questions[i];
        const { data: question } = await supabase
          .from("poll_questions")
          .insert({ poll_id: poll.id, question: q.question, question_type: q.type || "single", sort_order: i })
          .select()
          .single();

        if (question && q.options) {
          await supabase.from("poll_options").insert(
            q.options.map((opt: string, j: number) => ({
              question_id: question.id,
              text: typeof opt === "string" ? opt : opt.text,
              sort_order: j,
            }))
          );
        }
      }
    }

    return poll;
  },

  vote: async (id: string, answers: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: response, error } = await supabase
      .from("poll_responses")
      .insert({ poll_id: id, user_id: user.id })
      .select()
      .single();

    if (error) throw error;

    const { data: questions } = await supabase
      .from("poll_questions")
      .select("id, poll_options(id)")
      .eq("poll_id", id)
      .order("sort_order");

    if (answers && questions) {
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const question = questions[i];
        if (!question) continue;

        const selectedIds: string[] = [];
        if (typeof answer === "number" && question.poll_options[answer]) {
          selectedIds.push(question.poll_options[answer].id);
        } else if (Array.isArray(answer)) {
          answer.forEach((idx: number) => {
            if (question.poll_options[idx]) selectedIds.push(question.poll_options[idx].id);
          });
        }

        await supabase.from("poll_answers").insert({
          response_id: response.id,
          question_id: question.id,
          selected_option_ids: selectedIds,
        });

        for (const optId of selectedIds) {
          await supabase.rpc("increment_vote", { option_id: optId });
        }
      }
    }

    return { message: "Vote submitted" };
  },

  getResults: async (id: string) => {
    const { data: poll } = await supabase.from("polls").select("*").eq("id", id).single();
    const { count } = await supabase.from("poll_responses").select("*", { count: "exact", head: true }).eq("poll_id", id);
    const { data: questions } = await supabase.from("poll_questions").select("*, poll_options(*)").eq("poll_id", id).order("sort_order");

    return {
      title: poll?.title,
      totalResponses: count || 0,
      questions: (questions || []).map((q) => ({
        question: q.question,
        options: (q.poll_options || []).map((opt) => ({
          text: opt.text,
          votes: opt.votes,
          percentage: (count || 0) > 0 ? ((opt.votes / (count || 1)) * 100).toFixed(1) : "0",
        })),
      })),
    };
  },

  update: async (id: string, data: any) => {
    const { error } = await supabase.from("polls").update(data).eq("id", id);
    if (error) throw error;
  },

  delete: async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("polls")
      .update({ is_deleted: true, deleted_at: new Date().toISOString(), deleted_by: user?.id })
      .eq("id", id);
    if (error) throw error;
  },
};

// ============================================
// NOTIFICATIONS API
// ============================================
export const notifications = {
  getAll: async (page = 1, limit = 50, unreadOnly = false, type?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("notifications")
      .select("*", { count: "exact" })
      .eq("user_id", user.id);

    if (unreadOnly) query = query.eq("is_read", false);
    if (type) query = query.eq("type", type);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    const { count: unreadCount } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    return { notifications: data, total: count || 0, unreadCount: unreadCount || 0 };
  },

  getUnread: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_read", false)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { notifications: data || [] };
  },

  getUnreadCount: async (type?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { count: 0 };

    let query = supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (type) query = query.eq("type", type);

    const { count, error } = await query;
    return { count: count || 0 };
  },

  markAsRead: async (id: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  },

  markAllAsRead: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("is_read", false);
    if (error) throw error;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("notifications").delete().eq("id", id);
    if (error) throw error;
  },
};

// ============================================
// ANNOUNCEMENTS API
// ============================================
export const announcements = {
  getAll: async (page = 1, limit = 50, category?: string, search?: string) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("announcements")
      .select("*, profiles:created_by(first_name, last_name, role)", { count: "exact" })
      .eq("is_active", true);

    if (category && category !== "all") query = query.eq("category", category);
    if (search) query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);

    const { data, count, error } = await query
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Check read status
    const { data: { user } } = await supabase.auth.getUser();
    let readStatuses: Record<string, boolean> = {};
    if (user && data && data.length > 0) {
      const { data: readData } = await supabase
        .from("announcement_read_status")
        .select("announcement_id")
        .eq("user_id", user.id)
        .in("announcement_id", data.map((a) => a.id));
      if (readData) readData.forEach((r) => { readStatuses[r.announcement_id] = true; });
    }

    return {
      announcements: (data || []).map((a) => ({ ...a, isRead: !!readStatuses[a.id] })),
      total: count || 0,
    };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*, profiles:created_by(first_name, last_name, email, role)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  create: async (data: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: announcement, error } = await supabase
      .from("announcements")
      .insert({
        title: data.title,
        content: data.content,
        category: data.category || "general",
        is_pinned: data.is_pinned || false,
        priority: data.priority || "normal",
        created_by: user.id,
      })
      .select("*, profiles:created_by(first_name, last_name, role)")
      .single();

    if (error) throw error;

    // Notify all users
    const { data: users } = await supabase.from("profiles").select("user_id").eq("role", "user");
    if (users && users.length > 0) {
      await supabase.from("notifications").insert(
        users.map((u) => ({
          user_id: u.user_id,
          type: "announcement",
          title: "New Announcement",
          message: data.title,
          priority: data.priority || "medium",
          related_entity_type: "announcement",
          related_entity_id: announcement.id,
          action_url: "/announcements",
        }))
      );
    }

    return announcement;
  },

  update: async (id: string, data: any) => {
    const { data: announcement, error } = await supabase
      .from("announcements")
      .update(data)
      .eq("id", id)
      .select("*, profiles:created_by(first_name, last_name, role)")
      .single();
    if (error) throw error;
    return announcement;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) throw error;
  },

  markAsRead: async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    await supabase.from("announcement_read_status").upsert(
      { announcement_id: id, user_id: user.id },
      { onConflict: "announcement_id,user_id" }
    );
  },
};

// ============================================
// STATS API
// ============================================
export const stats = {
  getPublic: async () => {
    const [usersRes, incidentsRes, documentsRes, resolvedRes, completedRes] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "user").eq("is_active", true),
      supabase.from("incidents").select("*", { count: "exact", head: true }),
      supabase.from("document_requests").select("*", { count: "exact", head: true }),
      supabase.from("incidents").select("*", { count: "exact", head: true }).eq("status", "resolved"),
      supabase.from("document_requests").select("*", { count: "exact", head: true }).in("status", ["ready", "claimed"]),
    ]);

    const totalItems = (incidentsRes.count || 0) + (documentsRes.count || 0);
    const completedItems = (resolvedRes.count || 0) + (completedRes.count || 0);
    const satisfactionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 99;

    return {
      success: true,
      data: {
        activeResidents: usersRes.count || 10500,
        connectedBarangays: 50,
        satisfactionRate: Math.min(satisfactionRate, 99),
      },
    };
  },
};
