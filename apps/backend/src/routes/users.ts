import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { supabase } from '../index';

const router = Router();

// Get current user profile
router.get('/profile', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.user!.id)
    .single();

  if (error) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}));

// Update user profile
router.patch('/profile', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const allowedFields = ['full_name', 'stellar_public_key', 'phone', 'country_code', 'timezone', 'language'];
  const updateData: any = {};

  // Only allow updating specific fields
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', req.user!.id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
}));

// Get user's groups
router.get('/groups', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { data, error } = await supabase
    .rpc('get_user_groups', { user_uuid: req.user!.id });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
}));

export default router;