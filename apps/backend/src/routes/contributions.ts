import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { asyncHandler, createError } from "../middleware/errorHandler";
import { supabase } from "../index";
import { ContributionRequest } from "../types";

const router = Router();

// Record a contribution
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { group_id, amount, stellar_transaction_id }: ContributionRequest =
      req.body;

    if (!group_id || !amount || !stellar_transaction_id) {
      throw createError(
        "Group ID, amount, and Stellar transaction ID are required",
        400
      );
    }

    if (amount <= 0) {
      throw createError("Amount must be positive", 400);
    }

    // Verify user is a member of the group
    const { data: membership, error: membershipError } = await supabase
      .from("group_memberships")
      .select("id, current_balance")
      .eq("group_id", group_id)
      .eq("user_id", req.user!.id)
      .eq("status", "active")
      .single();

    if (membershipError || !membership) {
      throw createError("Not a member of this group", 403);
    }

    // Check if transaction already exists
    const { data: existingTransaction } = await supabase
      .from("transactions")
      .select("id")
      .eq("stellar_transaction_id", stellar_transaction_id)
      .single();

    if (existingTransaction) {
      throw createError("Transaction already recorded", 400);
    }

    // Create transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        group_id,
        user_id: req.user!.id,
        type: "contribution",
        amount,
        stellar_transaction_id,
        status: "confirmed",
        description: `Contribution to group`,
      })
      .select()
      .single();

    if (transactionError) {
      throw createError("Failed to record transaction", 500);
    }

    // Update user's balance in the group
    const newBalance = Number(membership.current_balance) + amount;

    // Get current total_contributed to calculate new value
    const { data: currentMembership } = await supabase
      .from("group_memberships")
      .select("total_contributed")
      .eq("id", membership.id)
      .single();

    const newTotalContributed =
      Number(currentMembership?.total_contributed || 0) + amount;

    const { error: balanceError } = await supabase
      .from("group_memberships")
      .update({
        current_balance: newBalance,
        total_contributed: newTotalContributed,
      })
      .eq("id", membership.id);

    if (balanceError) {
      throw createError("Failed to update balance", 500);
    }

    // Update group total balance
    await supabase.rpc("calculate_group_balance", { group_uuid: group_id });

    res.status(201).json({
      message: "Contribution recorded successfully",
      transaction,
      new_balance: newBalance,
    });
  })
);

// Get user's contributions for a group
router.get(
  "/group/:groupId",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const groupId = req.params.groupId;

    // Verify user is a member
    const { data: membership } = await supabase
      .from("group_memberships")
      .select("id")
      .eq("group_id", groupId)
      .eq("user_id", req.user!.id)
      .eq("status", "active")
      .single();

    if (!membership) {
      throw createError("Access denied", 403);
    }

    const { data: contributions, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("group_id", groupId)
      .eq("user_id", req.user!.id)
      .eq("type", "contribution")
      .order("created_at", { ascending: false });

    if (error) {
      throw createError("Failed to fetch contributions", 500);
    }

    res.json(contributions);
  })
);

export default router;
