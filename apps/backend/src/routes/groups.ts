import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { supabase } from '../index';
import { CreateGroupRequest, JoinGroupRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Generate invite code
const generateInviteCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Create new group
router.post('/', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { name, description, settings }: CreateGroupRequest = req.body;

  if (!name || name.trim().length === 0) {
    throw createError('Group name is required', 400);
  }

  const inviteCode = generateInviteCode();

  // Create group
  const { data: group, error: groupError } = await supabase
    .from('groups')
    .insert({
      name: name.trim(),
      description: description?.trim(),
      creator_id: req.user!.id,
      invite_code: inviteCode,
      settings: settings || {}
    })
    .select()
    .single();

  if (groupError) {
    throw createError(groupError.message, 400);
  }

  // Add creator as admin member
  const { error: membershipError } = await supabase
    .from('group_memberships')
    .insert({
      group_id: group.id,
      user_id: req.user!.id,
      role: 'admin'
    });

  if (membershipError) {
    // Rollback group creation
    await supabase.from('groups').delete().eq('id', group.id);
    throw createError('Failed to create group membership', 500);
  }

  res.status(201).json(group);
}));

// Get group details
router.get('/:id', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const groupId = req.params.id;

  // Check if user is a member of the group
  const { data: membership } = await supabase
    .from('group_memberships')
    .select('role')
    .eq('group_id', groupId)
    .eq('user_id', req.user!.id)
    .eq('status', 'active')
    .single();

  if (!membership) {
    throw createError('Group not found or access denied', 404);
  }

  // Get group details
  const { data: group, error } = await supabase
    .from('groups')
    .select(`
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
    `)
    .eq('id', groupId)
    .single();

  if (error) {
    throw createError('Group not found', 404);
  }

  res.json(group);
}));

// Join group with invite code
router.post('/join', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { invite_code }: JoinGroupRequest = req.body;

  if (!invite_code) {
    throw createError('Invite code is required', 400);
  }

  // Find group by invite code
  const { data: group, error: groupError } = await supabase
    .from('groups')
    .select('id, name, status, member_count, settings')
    .eq('invite_code', invite_code.toUpperCase())
    .single();

  if (groupError || !group) {
    throw createError('Invalid invite code', 404);
  }

  if (group.status !== 'active') {
    throw createError('Group is not active', 400);
  }

  // Check if user is already a member
  const { data: existingMembership } = await supabase
    .from('group_memberships')
    .select('id, status')
    .eq('group_id', group.id)
    .eq('user_id', req.user!.id)
    .single();

  if (existingMembership) {
    if (existingMembership.status === 'active') {
      throw createError('Already a member of this group', 400);
    } else {
      // Reactivate membership
      const { data, error } = await supabase
        .from('group_memberships')
        .update({ status: 'active' })
        .eq('id', existingMembership.id)
        .select()
        .single();

      if (error) {
        throw createError('Failed to rejoin group', 500);
      }

      return res.json({ message: 'Rejoined group successfully', membership: data });
    }
  }

  // Check max members limit
  if (group.member_count >= group.settings.max_members) {
    throw createError('Group has reached maximum member limit', 400);
  }

  // Create new membership
  const { data: membership, error: membershipError } = await supabase
    .from('group_memberships')
    .insert({
      group_id: group.id,
      user_id: req.user!.id,
      role: 'member'
    })
    .select()
    .single();

  if (membershipError) {
    throw createError('Failed to join group', 500);
  }

  // Update group member count
  await supabase
    .from('groups')
    .update({ member_count: group.member_count + 1 })
    .eq('id', group.id);

  res.status(201).json({
    message: 'Joined group successfully',
    group: { id: group.id, name: group.name },
    membership
  });
}));

// Get group transactions
router.get('/:id/transactions', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const groupId = req.params.id;
  const { page = 1, limit = 20 } = req.query;

  // Verify user is a member
  const { data: membership } = await supabase
    .from('group_memberships')
    .select('id')
    .eq('group_id', groupId)
    .eq('user_id', req.user!.id)
    .eq('status', 'active')
    .single();

  if (!membership) {
    throw createError('Access denied', 403);
  }

  const offset = (Number(page) - 1) * Number(limit);

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select(`
      *,
      users(full_name, avatar_url)
    `)
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })
    .range(offset, offset + Number(limit) - 1);

  if (error) {
    throw createError('Failed to fetch transactions', 500);
  }

  res.json(transactions);
}));

// Get group balance
router.get('/:id/balance', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const groupId = req.params.id;

  // Verify user is a member
  const { data: membership } = await supabase
    .from('group_memberships')
    .select('current_balance')
    .eq('group_id', groupId)
    .eq('user_id', req.user!.id)
    .eq('status', 'active')
    .single();

  if (!membership) {
    throw createError('Access denied', 403);
  }

  // Calculate and update group balance
  const { data: totalBalance, error } = await supabase
    .rpc('calculate_group_balance', { group_uuid: groupId });

  if (error) {
    throw createError('Failed to calculate balance', 500);
  }

  res.json({
    group_total: totalBalance,
    user_balance: membership.current_balance
  });
}));

export default router;