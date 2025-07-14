import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { asyncHandler, createError } from "../middleware/errorHandler";
import { supabase } from "../index";
import { CreateGroupRequest, JoinGroupRequest } from "../types";
import { ContractDeploymentService } from "../services/contract-deployment-service";
import { v4 as uuidv4 } from "uuid";
import { StellarService } from "../services/stellar-service";
import { BlendService } from "../services/blend-service";

const router = Router();

// Generate invite code
const generateInviteCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Create new group
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const {
      name,
      description,
      settings,
      initial_contribution_amount = 10,
      stellar_transaction_id,
    }: CreateGroupRequest & {
      initial_contribution_amount?: number;
      stellar_transaction_id?: string;
    } = req.body;

    if (!name || name.trim().length === 0) {
      throw createError("Group name is required", 400);
    }

    // Validar contribución inicial mínima
    if (initial_contribution_amount < 10) {
      throw createError("Initial contribution must be at least $10 USDC", 400);
    }

    // Requerir transacción Stellar para la contribución inicial
    if (!stellar_transaction_id) {
      throw createError(
        "Stellar transaction ID for initial contribution is required",
        400
      );
    }

    const inviteCode = generateInviteCode();

    // Create group
    const { data: group, error: groupError } = await supabase
      .from("groups")
      .insert({
        name: name.trim(),
        description: description?.trim(),
        creator_id: req.user!.id,
        invite_code: inviteCode,
        settings: settings || {},
      })
      .select()
      .single();

    if (groupError) {
      throw createError(groupError.message, 400);
    }

    // Validar la transacción Stellar inicial antes de continuar
    console.log("🔍 Validando transacción Stellar inicial...");
    try {
      const validation = await StellarService.validateTransaction(
        stellar_transaction_id,
        initial_contribution_amount,
        req.user!.stellar_public_key || "",
        "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5" // USDC issuer testnet - can always receive USDC
      );

      if (!validation.isValid) {
        await supabase.from("groups").delete().eq("id", group.id);
        throw createError(
          `Invalid Stellar transaction: ${validation.error}`,
          400
        );
      }
      console.log("✅ Transacción Stellar validada exitosamente");
    } catch (error) {
      await supabase.from("groups").delete().eq("id", group.id);
      throw createError(
        `Failed to validate Stellar transaction: ${error.message}`,
        400
      );
    }

    // Add creator as admin member with initial balance
    const { error: membershipError } = await supabase
      .from("group_memberships")
      .insert({
        group_id: group.id,
        user_id: req.user!.id,
        role: "admin",
        current_balance: initial_contribution_amount,
        total_contributed: initial_contribution_amount,
      });

    if (membershipError) {
      // Rollback group creation
      await supabase.from("groups").delete().eq("id", group.id);
      throw createError("Failed to create group membership", 500);
    }

    // Registrar la contribución inicial
    const { error: transactionError } = await supabase
      .from("transactions")
      .insert({
        group_id: group.id,
        user_id: req.user!.id,
        type: "contribution",
        amount: initial_contribution_amount,
        stellar_transaction_id: stellar_transaction_id,
        status: "confirmed",
        description: "Initial group contribution",
      });

    if (transactionError) {
      console.error(
        "❌ Error registrando transacción inicial:",
        transactionError
      );
      // No fallar la creación del grupo por esto, pero loguearlo
    }

    // Actualizar balance total del grupo
    await supabase
      .from("groups")
      .update({
        total_balance: initial_contribution_amount,
        member_count: 1,
      })
      .eq("id", group.id);

    // 🚀 Deploy individual smart contract for this group
    console.log(
      `🚀 Desplegando contrato inteligente para grupo: ${group.name}`
    );
    let contractInfo: { contractId: string; isSimulated: boolean } | null =
      null;

    try {
      const contractService = new ContractDeploymentService();

      // Prepare contract configuration
      const contractConfig = {
        name: group.name,
        creator: req.user!.stellar_public_key || "TEMP_ADDRESS", // Use user's Stellar address
        minContribution: settings?.min_contribution || 10,
        maxContribution: settings?.max_contribution || 1000,
        maxMembers: settings?.max_members || 50,
        autoInvestEnabled: settings?.auto_invest_enabled || false,
      };

      // Deploy the contract
      const deploymentResult =
        await contractService.deployGroupContract(contractConfig);

      // Update group with contract information
      const { error: updateError } = await supabase
        .from("groups")
        .update({
          stellar_account_id: deploymentResult.contractId,
          // Store contract metadata
          settings: {
            ...settings,
            contract_id: deploymentResult.contractId,
            deployment_tx: deploymentResult.deploymentTxHash,
            init_tx: deploymentResult.initializationTxHash,
            is_contract_simulated: deploymentResult.isSimulated,
            contract_deployer_key: deploymentResult.creatorKeypair.publicKey(),
          },
        })
        .eq("id", group.id);

      if (updateError) {
        console.error(
          "❌ Error updating group with contract info:",
          updateError
        );
        // Don't fail the group creation, just log the error
      } else {
        console.log(
          `✅ Grupo actualizado con contrato: ${deploymentResult.contractId}`
        );
        contractInfo = {
          contractId: deploymentResult.contractId,
          isSimulated: deploymentResult.isSimulated,
        };
      }
    } catch (contractError) {
      console.error("❌ Error deploying contract for group:", contractError);
      // Don't fail group creation if contract deployment fails
      // The group can still function with database-only operations
    }

    // 💰 Hacer inversión inicial en Blend con los $10 mínimos
    console.log(
      `💰 Realizando inversión inicial de $${initial_contribution_amount} en Blend...`
    );
    try {
      const blendResult = await StellarService.autoInvestInBlend(
        group.id,
        0 // Invertir sin mínimo ya que es la inversión inicial
      );

      if (blendResult.success) {
        console.log(
          `✅ Inversión inicial exitosa: $${blendResult.amountInvested} invertidos en Blend`
        );

        // Registrar la inversión inicial en la base de datos
        await supabase.from("group_blend_investments").insert({
          group_id: group.id,
          amount_invested: blendResult.amountInvested,
          transaction_hash: blendResult.transactionHash,
          investment_date: new Date().toISOString(),
          triggered_by: req.user!.id,
          metadata: {
            is_initial_investment: true,
            group_creation: true,
          },
        });

        // Crear configuración inicial de Blend para el grupo
        await supabase.from("group_blend_settings").insert({
          group_id: group.id,
          auto_invest_enabled: settings?.auto_invest_enabled !== false, // Por defecto habilitado
          min_amount_to_invest: 100, // Mínimo $100 para futuras inversiones
          reserve_amount: 10, // $10 de reserva para fees
          total_invested: blendResult.amountInvested || 0,
          last_investment_date: new Date().toISOString(),
        });

        // La información de la inversión inicial se incluirá por separado en la respuesta
      } else {
        console.log(
          `⚠️ Inversión inicial no pudo ejecutarse: ${blendResult.error}`
        );
        // No fallar la creación del grupo, pero loguear la información

        // Crear configuración de Blend sin inversión inicial
        await supabase.from("group_blend_settings").insert({
          group_id: group.id,
          auto_invest_enabled: settings?.auto_invest_enabled !== false,
          min_amount_to_invest: 100,
          reserve_amount: 10,
          total_invested: 0,
        });
      }
    } catch (blendError) {
      console.error("❌ Error en inversión inicial de Blend:", blendError);
      // No fallar la creación del grupo por problemas de Blend

      // Crear configuración básica de Blend
      try {
        await supabase.from("group_blend_settings").insert({
          group_id: group.id,
          auto_invest_enabled: false, // Deshabilitar si hay error
          min_amount_to_invest: 100,
          reserve_amount: 10,
          total_invested: 0,
        });
      } catch (settingsError) {
        console.error(
          "❌ Error creando configuración de Blend:",
          settingsError
        );
      }
    }

    // Return group with contract and investment information
    const responseData = {
      ...group,
      contract_info: contractInfo,
      initial_contribution: {
        amount: initial_contribution_amount,
        stellar_transaction_id,
        blend_investment_attempted: true,
      },
      message:
        "Group created successfully with initial contribution and investment processing",
    };

    res.status(201).json(responseData);
  })
);

// Get group details
router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const groupId = req.params.id;

    // Check if user is a member of the group
    const { data: membership } = await supabase
      .from("group_memberships")
      .select("role")
      .eq("group_id", groupId)
      .eq("user_id", req.user!.id)
      .eq("status", "active")
      .single();

    if (!membership) {
      throw createError("Group not found or access denied", 404);
    }

    // Get group details
    const { data: group, error } = await supabase
      .from("groups")
      .select(
        `
      *,
      group_memberships(
        id,
        user_id,
        role,
        joined_at,
        current_balance,
        total_contributed,
        yield_earned,
        users(full_name, avatar_url)
      )
    `
      )
      .eq("id", groupId)
      .single();

    if (error) {
      throw createError("Group not found", 404);
    }

    res.json(group);
  })
);

// Join group with invite code
router.post(
  "/join",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { invite_code }: JoinGroupRequest = req.body;

    if (!invite_code) {
      throw createError("Invite code is required", 400);
    }

    // Find group by invite code
    const { data: group, error: groupError } = await supabase
      .from("groups")
      .select("id, name, status, member_count, settings")
      .eq("invite_code", invite_code.toUpperCase())
      .single();

    if (groupError || !group) {
      throw createError("Invalid invite code", 404);
    }

    if (group.status !== "active") {
      throw createError("Group is not active", 400);
    }

    // Check if user is already a member
    const { data: existingMembership } = await supabase
      .from("group_memberships")
      .select("id, status")
      .eq("group_id", group.id)
      .eq("user_id", req.user!.id)
      .single();

    if (existingMembership) {
      if (existingMembership.status === "active") {
        throw createError("Already a member of this group", 400);
      } else {
        // Reactivate membership
        const { data, error } = await supabase
          .from("group_memberships")
          .update({ status: "active" })
          .eq("id", existingMembership.id)
          .select()
          .single();

        if (error) {
          throw createError("Failed to rejoin group", 500);
        }

        return res.json({
          message: "Rejoined group successfully",
          membership: data,
        });
      }
    }

    // Check max members limit
    if (group.member_count >= group.settings.max_members) {
      throw createError("Group has reached maximum member limit", 400);
    }

    // Create new membership
    const { data: membership, error: membershipError } = await supabase
      .from("group_memberships")
      .insert({
        group_id: group.id,
        user_id: req.user!.id,
        role: "member",
      })
      .select()
      .single();

    if (membershipError) {
      throw createError("Failed to join group", 500);
    }

    // Update group member count
    await supabase
      .from("groups")
      .update({ member_count: group.member_count + 1 })
      .eq("id", group.id);

    res.status(201).json({
      message: "Joined group successfully",
      group: { id: group.id, name: group.name },
      membership,
    });
  })
);

// Get group transactions
router.get(
  "/:id/transactions",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const groupId = req.params.id;
    const { page = 1, limit = 20 } = req.query;

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

    const offset = (Number(page) - 1) * Number(limit);

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select(
        `
      *,
      users(full_name, avatar_url)
    `
      )
      .eq("group_id", groupId)
      .order("created_at", { ascending: false })
      .range(offset, offset + Number(limit) - 1);

    if (error) {
      throw createError("Failed to fetch transactions", 500);
    }

    res.json(transactions);
  })
);

// Get group balance
router.get(
  "/:id/balance",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const groupId = req.params.id;

    // Verify user is a member
    const { data: membership } = await supabase
      .from("group_memberships")
      .select("current_balance")
      .eq("group_id", groupId)
      .eq("user_id", req.user!.id)
      .eq("status", "active")
      .single();

    if (!membership) {
      throw createError("Access denied", 403);
    }

    // Calculate and update group balance
    const { data: totalBalance, error } = await supabase.rpc(
      "calculate_group_balance",
      { group_uuid: groupId }
    );

    if (error) {
      throw createError("Failed to calculate balance", 500);
    }

    res.json({
      group_total: totalBalance,
      user_balance: membership.current_balance,
    });
  })
);

// Auto-invertir fondos del grupo en Blend
router.post(
  "/:groupId/auto-invest",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { groupId } = req.params;
    const { minAmount } = req.body;

    console.log("🤖 Auto-inversión solicitada:", {
      groupId,
      minAmount,
      userId: req.user!.id,
    });

    // Verificar que el usuario es admin del grupo
    const { data: membership, error: membershipError } = await supabase
      .from("group_memberships")
      .select("role")
      .eq("group_id", groupId)
      .eq("user_id", req.user!.id)
      .eq("status", "active")
      .single();

    if (membershipError || !membership || membership.role !== "admin") {
      throw createError("Only group admins can trigger auto-investment", 403);
    }

    try {
      const result = await StellarService.autoInvestInBlend(
        groupId,
        minAmount || 100
      );

      if (result.success) {
        // Registrar la inversión en la base de datos
        await supabase.from("group_blend_investments").insert({
          group_id: groupId,
          amount_invested: result.amountInvested,
          transaction_hash: result.transactionHash,
          investment_date: new Date().toISOString(),
          triggered_by: req.user!.id,
        });

        res.json({
          success: true,
          message: "Auto-inversión ejecutada exitosamente",
          amountInvested: result.amountInvested,
          transactionHash: result.transactionHash,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error || "Auto-inversión no pudo ejecutarse",
        });
      }
    } catch (error) {
      console.error("Error en auto-inversión:", error);
      throw createError("Failed to execute auto-investment", 500);
    }
  })
);

// Inversión manual en Blend
router.post(
  "/:groupId/manual-invest",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { groupId } = req.params;
    const { amount } = req.body;

    console.log("🪙 Inversión manual solicitada:", {
      groupId,
      amount,
      userId: req.user!.id,
    });

    // Validar que se proporcione la cantidad
    if (!amount || amount <= 0) {
      throw createError("Amount is required and must be greater than 0", 400);
    }

    // Verificar que el usuario es admin del grupo
    const { data: membership, error: membershipError } = await supabase
      .from("group_memberships")
      .select("role")
      .eq("group_id", groupId)
      .eq("user_id", req.user!.id)
      .eq("status", "active")
      .single();

    if (membershipError || !membership || membership.role !== "admin") {
      throw createError("Only group admins can make manual investments", 403);
    }

    try {
      const result = await StellarService.manualInvestInBlend(
        groupId,
        amount,
        req.user!.id
      );

      if (result.success) {
        // Registrar la inversión en la base de datos
        await supabase.from("group_blend_investments").insert({
          group_id: groupId,
          amount_invested: result.amountInvested,
          transaction_hash: result.transactionHash,
          investment_date: new Date().toISOString(),
          triggered_by: req.user!.id,
          investment_type: "manual", // Marcar como inversión manual
        });

        res.json({
          success: true,
          message: "Inversión manual ejecutada exitosamente",
          amountInvested: result.amountInvested,
          transactionHash: result.transactionHash,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error || "Inversión manual no pudo ejecutarse",
        });
      }
    } catch (error) {
      console.error("Error en inversión manual:", error);
      throw createError("Failed to execute manual investment", 500);
    }
  })
);

// Obtener información de rendimientos de Blend
router.get(
  "/:groupId/blend-yield",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { groupId } = req.params;

    // Verificar que el usuario es miembro del grupo
    const { data: membership, error: membershipError } = await supabase
      .from("group_memberships")
      .select("id")
      .eq("group_id", groupId)
      .eq("user_id", req.user!.id)
      .eq("status", "active")
      .single();

    if (membershipError || !membership) {
      throw createError("User is not a member of this group", 403);
    }

    try {
      const yieldInfo = await StellarService.getBlendYieldInfo(groupId);

      // Obtener historial de inversiones
      const { data: investments } = await supabase
        .from("group_blend_investments")
        .select("*")
        .eq("group_id", groupId)
        .order("investment_date", { ascending: false });

      res.json({
        yieldInfo,
        investments: investments || [],
        nextAutoInvestDate: BlendService.getNextAutoInvestDate(),
      });
    } catch (error) {
      console.error("Error obteniendo info de rendimientos:", error);
      throw createError("Failed to get yield information", 500);
    }
  })
);

// Retirar fondos de Blend (solo admins)
router.post(
  "/:groupId/withdraw-blend",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { groupId } = req.params;
    const { amount, reason } = req.body;

    if (!amount || amount <= 0) {
      throw createError("Valid amount is required", 400);
    }

    // Verificar que el usuario es admin del grupo
    const { data: membership, error: membershipError } = await supabase
      .from("group_memberships")
      .select("role")
      .eq("group_id", groupId)
      .eq("user_id", req.user!.id)
      .eq("status", "active")
      .single();

    if (membershipError || !membership || membership.role !== "admin") {
      throw createError("Only group admins can withdraw from Blend", 403);
    }

    try {
      const result = await StellarService.withdrawFromBlend(groupId, amount);

      if (result.success) {
        // Registrar el retiro en la base de datos
        await supabase.from("group_blend_withdrawals").insert({
          group_id: groupId,
          amount_withdrawn: amount,
          transaction_hash: result.transactionHash,
          withdrawal_date: new Date().toISOString(),
          reason: reason || "Manual withdrawal",
          triggered_by: req.user!.id,
        });

        res.json({
          success: true,
          message: "Retiro de Blend ejecutado exitosamente",
          amountWithdrawn: amount,
          transactionHash: result.transactionHash,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error || "Retiro no pudo ejecutarse",
        });
      }
    } catch (error) {
      console.error("Error en retiro de Blend:", error);
      throw createError("Failed to withdraw from Blend", 500);
    }
  })
);

export default router;
