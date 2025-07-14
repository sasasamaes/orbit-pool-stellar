import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { asyncHandler, createError } from "../middleware/errorHandler";
import { supabase } from "../index";
import { ContributionRequest, ContributionResponse } from "../types";
import { StellarService } from "../services/stellar-service";

const router = Router();

// Record a contribution with blockchain validation
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const {
      group_id,
      amount,
      stellar_transaction_id,
      wallet_address,
      asset = "USDC",
    }: ContributionRequest = req.body;

    console.log("🚀 Processing contribution:", {
      group_id,
      amount,
      stellar_transaction_id,
      wallet_address,
      asset,
      user_id: req.user!.id,
    });

    // Validaciones básicas
    if (!group_id || !amount || !stellar_transaction_id || !wallet_address) {
      throw createError(
        "Group ID, amount, Stellar transaction ID, and wallet address are required",
        400
      );
    }

    if (amount <= 0) {
      throw createError("Amount must be positive", 400);
    }

    // Verificar que el usuario es miembro del grupo
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

    // Verificar que la transacción no existe ya
    const { data: existingTransaction } = await supabase
      .from("transactions")
      .select("id")
      .eq("stellar_transaction_id", stellar_transaction_id)
      .single();

    if (existingTransaction) {
      throw createError("Transaction already recorded", 400);
    }

    // Validar la transacción en el blockchain de Stellar
    const stellarService = new StellarService();
    console.log("🔍 Validating transaction on Stellar blockchain...");

    const validation = await stellarService.validateTransaction(
      stellar_transaction_id,
      wallet_address,
      amount,
      asset
    );

    console.log("✅ Blockchain validation result:", validation);

    if (!validation.isValid) {
      throw createError(
        "Transaction validation failed. Please ensure the transaction exists on Stellar blockchain and matches the provided details.",
        400
      );
    }

    // Actualizar la stellar_public_key del usuario si no existe
    if (req.user!.stellar_public_key !== wallet_address) {
      console.log("📝 Updating user stellar public key...");
      await supabase
        .from("users")
        .update({ stellar_public_key: wallet_address })
        .eq("id", req.user!.id);
    }

    // Crear registro de transacción
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        group_id,
        user_id: req.user!.id,
        type: "contribution",
        amount: validation.amount || amount,
        stellar_transaction_id,
        stellar_operation_id: validation.ledger?.toString(),
        status: "confirmed",
        description: `Contribution to group from ${validation.sourceAccount}`,
        metadata: {
          wallet_address,
          asset: validation.asset,
          blockchain_validation: {
            validated_at: new Date().toISOString(),
            source_account: validation.sourceAccount,
            destination_account: validation.destinationAccount,
            actual_amount: validation.amount,
            ledger: validation.ledger,
            memo: validation.memo,
          },
        },
      })
      .select()
      .single();

    if (transactionError) {
      console.error("❌ Failed to create transaction:", transactionError);
      throw createError("Failed to record transaction", 500);
    }

    // Actualizar balance del usuario en el grupo
    const newBalance =
      Number(membership.current_balance) + (validation.amount || amount);

    // Obtener total_contributed actual para calcular nuevo valor
    const { data: currentMembership } = await supabase
      .from("group_memberships")
      .select("total_contributed")
      .eq("id", membership.id)
      .single();

    const newTotalContributed =
      Number(currentMembership?.total_contributed || 0) +
      (validation.amount || amount);

    const { error: balanceError } = await supabase
      .from("group_memberships")
      .update({
        current_balance: newBalance,
        total_contributed: newTotalContributed,
      })
      .eq("id", membership.id);

    if (balanceError) {
      console.error("❌ Failed to update balance:", balanceError);
      throw createError("Failed to update balance", 500);
    }

    // Actualizar balance total del grupo
    console.log("📊 Updating group total balance...");
    await supabase.rpc("calculate_group_balance", { group_uuid: group_id });

    const response: ContributionResponse = {
      message: "Contribution recorded and validated successfully",
      transaction,
      new_balance: newBalance,
      validation: {
        isValid: validation.isValid,
        sourceAccount: validation.sourceAccount || wallet_address,
        amount: validation.amount || amount,
        asset: validation.asset || asset,
        timestamp: validation.timestamp || new Date().toISOString(),
      },
    };

    console.log("🎉 Contribution processed successfully:", {
      transaction_id: transaction.id,
      new_balance: newBalance,
    });

    res.status(201).json(response);
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
