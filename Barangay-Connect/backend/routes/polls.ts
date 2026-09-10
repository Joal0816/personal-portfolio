import express, { Response } from "express";
import { supabase } from "../config/supabase";
import { protect, admin, optionalAuth, AuthRequest } from "../middleware/auth";

const router = express.Router();

// Create poll (admin)
router.post("/", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, type, questions, start_date, end_date, is_anonymous } = req.body;

    // Create poll
    const { data: poll, error: pollError } = await supabase
      .from("polls")
      .insert({
        title,
        description,
        type: type || "poll",
        status: "active",
        start_date: start_date || new Date().toISOString(),
        end_date: end_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        is_anonymous: is_anonymous || false,
        created_by: req.user!.id,
      })
      .select()
      .single();

    if (pollError) throw pollError;

    // Create questions and options
    if (questions && questions.length > 0) {
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const { data: question, error: qError } = await supabase
          .from("poll_questions")
          .insert({
            poll_id: poll.id,
            question: q.question,
            question_type: q.type || "single",
            sort_order: i,
          })
          .select()
          .single();

        if (qError) throw qError;

        if (q.options && q.options.length > 0) {
          const options = q.options.map((opt: string, j: number) => ({
            question_id: question.id,
            text: typeof opt === "string" ? opt : opt.text,
            sort_order: j,
          }));
          await supabase.from("poll_options").insert(options);
        }
      }
    }

    // Notify all users
    const { data: users } = await supabase.from("profiles").select("user_id").eq("role", "user");
    if (users && users.length > 0) {
      const notifications = users.map((u) => ({
        user_id: u.user_id,
        type: "poll",
        title: "New Poll Available",
        message: `New poll "${title}" is now available. Your voice matters!`,
        priority: "medium",
        related_entity_type: "poll",
        related_entity_id: poll.id,
        action_url: "/polls",
      }));
      await supabase.from("notifications").insert(notifications);
    }

    res.status(201).json(poll);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// List polls
router.get("/", optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const status = req.query.status as string;
    const includeDeleted = req.query.includeDeleted === "true";

    // Auto-close expired polls
    await supabase
      .from("polls")
      .update({ status: "closed" })
      .eq("status", "active")
      .lt("end_date", new Date().toISOString())
      .eq("is_deleted", false);

    let query = supabase
      .from("polls")
      .select("*, profiles:created_by(first_name, last_name), deleted_by_user:deleted_by(first_name, last_name)", { count: "exact" });

    if (!req.user || req.user.role !== "admin") {
      query = query.eq("is_deleted", false);
      if (status === "active") query = query.eq("status", "active");
      else if (status === "closed") query = query.eq("status", "closed");
      else if (status) query = query.eq("status", status);
    } else {
      if (status) query = query.eq("status", status);
      if (!includeDeleted) query = query.eq("is_deleted", false);
    }

    const { data: polls, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Enrich polls with vote info
    const enrichedPolls = await Promise.all(
      (polls || []).map(async (poll) => {
        // Get questions with options
        const { data: questions } = await supabase
          .from("poll_questions")
          .select("*, poll_options(*)")
          .eq("poll_id", poll.id)
          .order("sort_order");

        // Get response count
        const { count: responseCount } = await supabase
          .from("poll_responses")
          .select("*", { count: "exact", head: true })
          .eq("poll_id", poll.id);

        let hasVoted = false;
        let canVote = true;
        let voteEndedReason: string | null = null;

        if (req.user && !poll.is_anonymous) {
          const { data: existingResponse } = await supabase
            .from("poll_responses")
            .select("id")
            .eq("poll_id", poll.id)
            .eq("user_id", req.user.id)
            .maybeSingle();

          if (existingResponse) {
            hasVoted = true;
            canVote = false;
            voteEndedReason = "You have already voted on this poll";
          }
        }

        if (poll.end_date && new Date() > new Date(poll.end_date)) {
          canVote = false;
          if (!voteEndedReason) voteEndedReason = "Voting period has ended";
        }

        if (poll.status !== "active") {
          canVote = false;
          if (!voteEndedReason) voteEndedReason = "This poll is not currently active";
        }

        return {
          ...poll,
          questions: questions || [],
          totalResponses: responseCount || 0,
          hasVoted,
          canVote,
          voteEndedReason,
        };
      })
    );

    res.json({
      polls: enrichedPolls,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit),
      total: count || 0,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get poll by ID
router.get("/:id", optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { data: poll, error } = await supabase
      .from("polls")
      .select("*, profiles:created_by(first_name, last_name)")
      .eq("id", req.params.id)
      .single();

    if (error || !poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    // Get questions with options
    const { data: questions } = await supabase
      .from("poll_questions")
      .select("*, poll_options(*)")
      .eq("poll_id", poll.id)
      .order("sort_order");

    // Get response count
    const { count: responseCount } = await supabase
      .from("poll_responses")
      .select("*", { count: "exact", head: true })
      .eq("poll_id", poll.id);

    let hasVoted = false;
    let userVote = null;
    let canVote = true;
    let voteEndedReason: string | null = null;

    if (req.user) {
      const { data: existingResponse } = await supabase
        .from("poll_responses")
        .select("id")
        .eq("poll_id", poll.id)
        .eq("user_id", req.user.id)
        .maybeSingle();

      if (existingResponse) {
        hasVoted = true;
        canVote = false;
        voteEndedReason = "You have already voted on this poll";

        // Get user's answers
        const { data: answers } = await supabase
          .from("poll_answers")
          .select("*")
          .eq("response_id", existingResponse.id);
        userVote = answers;
      }
    }

    if (poll.end_date && new Date() > new Date(poll.end_date)) {
      canVote = false;
      if (!voteEndedReason) voteEndedReason = "Voting period has ended";
    }

    if (poll.status !== "active") {
      canVote = false;
      if (!voteEndedReason) voteEndedReason = "This poll is not currently active";
    }

    res.json({
      ...poll,
      questions: questions || [],
      totalResponses: responseCount || 0,
      hasVoted,
      canVote,
      voteEndedReason,
      userVote,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Vote on poll
router.post("/:id/vote", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { answers } = req.body;

    const { data: poll, error: pollError } = await supabase
      .from("polls")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (pollError || !poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (poll.end_date && new Date() > new Date(poll.end_date)) {
      return res.status(400).json({ message: "Voting period has ended" });
    }

    if (poll.status !== "active") {
      return res.status(400).json({ message: "Poll is not active" });
    }

    // Check for existing response (non-anonymous)
    if (!poll.is_anonymous) {
      const { data: existing } = await supabase
        .from("poll_responses")
        .select("id")
        .eq("poll_id", poll.id)
        .eq("user_id", req.user!.id)
        .maybeSingle();

      if (existing) {
        return res.status(400).json({ message: "You have already voted on this poll" });
      }
    }

    // Create response
    const { data: response, error: responseError } = await supabase
      .from("poll_responses")
      .insert({
        poll_id: poll.id,
        user_id: poll.is_anonymous ? null : req.user!.id,
      })
      .select()
      .single();

    if (responseError) throw responseError;

    // Get questions to map answers
    const { data: questions } = await supabase
      .from("poll_questions")
      .select("id, poll_options(id)")
      .eq("poll_id", poll.id)
      .order("sort_order");

    // Create answers and update vote counts
    if (answers && questions) {
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const question = questions[i];
        if (!question) continue;

        const selectedOptionIds: string[] = [];
        let textAnswer: string | null = null;

        if (typeof answer === "number") {
          selectedOptionIds.push(question.poll_options[answer]?.id);
        } else if (Array.isArray(answer)) {
          answer.forEach((idx: number) => {
            if (question.poll_options[idx]) {
              selectedOptionIds.push(question.poll_options[idx].id);
            }
          });
        } else if (typeof answer === "object" && answer.selectedOptions) {
          answer.selectedOptions.forEach((idx: number) => {
            if (question.poll_options[idx]) {
              selectedOptionIds.push(question.poll_options[idx].id);
            }
          });
          textAnswer = answer.textAnswer || null;
        } else {
          textAnswer = String(answer);
        }

        // Create answer record
        await supabase.from("poll_answers").insert({
          response_id: response.id,
          question_id: question.id,
          selected_option_ids: selectedOptionIds.filter(Boolean),
          text_answer: textAnswer,
        });

        // Increment vote counts
        for (const optionId of selectedOptionIds.filter(Boolean)) {
          await supabase.rpc("increment_vote", { option_id: optionId });
        }
      }
    }

    // Mark related notifications as read
    await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("user_id", req.user!.id)
      .eq("related_entity_id", poll.id)
      .eq("is_read", false);

    res.json({ message: "Vote submitted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update poll (admin)
router.patch("/:id", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { status, title, description, end_date } = req.body;

    const updateData: Record<string, any> = {};
    if (status) updateData.status = status;
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (end_date) updateData.end_date = end_date;

    const { data, error } = await supabase
      .from("polls")
      .update(updateData)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (status === "closed") {
      await supabase
        .from("notifications")
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq("related_entity_id", req.params.id)
        .eq("is_read", false);
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get poll results
router.get("/:id/results", async (req: AuthRequest, res: Response) => {
  try {
    const { data: poll, error } = await supabase
      .from("polls")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error || !poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (poll.status !== "closed" && (!req.user || req.user.role !== "admin")) {
      return res.status(403).json({ message: "Results not available yet" });
    }

    const { count: totalResponses } = await supabase
      .from("poll_responses")
      .select("*", { count: "exact", head: true })
      .eq("poll_id", poll.id);

    const { data: questions } = await supabase
      .from("poll_questions")
      .select("*, poll_options(*)")
      .eq("poll_id", poll.id)
      .order("sort_order");

    const results = {
      title: poll.title,
      description: poll.description,
      status: poll.status,
      totalResponses: totalResponses || 0,
      is_anonymous: poll.is_anonymous,
      questions: (questions || []).map((q) => ({
        question: q.question,
        type: q.question_type,
        options: (q.poll_options || []).map((opt) => ({
          text: opt.text,
          votes: opt.votes,
          percentage: (totalResponses || 0) > 0
            ? ((opt.votes / (totalResponses || 1)) * 100).toFixed(1)
            : "0",
        })),
      })),
    };

    res.json(results);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Soft delete poll (admin)
router.delete("/:id", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("polls")
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        deleted_by: req.user!.id,
      })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Poll deleted successfully. You can undo this action.", poll: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Undo poll deletion (admin)
router.post("/:id/undo", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("polls")
      .update({
        is_deleted: false,
        deleted_at: null,
        deleted_by: null,
      })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Poll restored successfully", poll: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Permanent delete (admin)
router.delete("/:id/permanent", protect, admin, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase.from("polls").delete().eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Poll permanently deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
