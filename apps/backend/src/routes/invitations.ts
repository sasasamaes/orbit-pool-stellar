import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { InvitationService } from '../services/invitation';
import { 
  CreateInvitationRequest, 
  SendEmailInvitationRequest 
} from '../services/invitation';

const router = Router();

// Create a new invitation
router.post('/', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const data: CreateInvitationRequest = req.body;
  
  if (!data.group_id) {
    throw createError('Group ID is required', 400);
  }

  const invitation = await InvitationService.createInvitation(req.user!.id, data);
  
  // Generate invite links
  const inviteLink = InvitationService.generateInviteLink(invitation.invite_token);
  const codeLink = InvitationService.generateCodeLink(invitation.invite_code);

  res.status(201).json({
    invitation,
    links: {
      secure_link: inviteLink,
      code_link: codeLink
    }
  });
}));

// Send email invitation
router.post('/email', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const data: SendEmailInvitationRequest = req.body;
  
  if (!data.group_id || !data.email) {
    throw createError('Group ID and email are required', 400);
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw createError('Invalid email format', 400);
  }

  const result = await InvitationService.sendEmailInvitation(req.user!.id, data);
  
  // Generate invite links for response
  const inviteLink = InvitationService.generateInviteLink(result.invitation.invite_token);
  const codeLink = InvitationService.generateCodeLink(result.invitation.invite_code);

  res.status(201).json({
    invitation: result.invitation,
    email_sent: result.email_sent,
    links: {
      secure_link: inviteLink,
      code_link: codeLink
    }
  });
}));

// Get invitation by token (public endpoint for join page)
router.get('/token/:token', asyncHandler(async (req, res) => {
  const { token } = req.params;
  
  if (!token) {
    throw createError('Token is required', 400);
  }

  const invitation = await InvitationService.getInvitationByToken(token);
  
  // Don't expose sensitive information
  const publicInvitation = {
    id: invitation.id,
    group: invitation.groups,
    inviter: invitation.users,
    message: invitation.message,
    expires_at: invitation.expires_at,
    created_at: invitation.created_at
  };

  res.json(publicInvitation);
}));

// Get invitation by code (public endpoint)
router.get('/code/:code', asyncHandler(async (req, res) => {
  const { code } = req.params;
  
  if (!code) {
    throw createError('Code is required', 400);
  }

  const invitation = await InvitationService.getInvitationByCode(code);
  
  // Don't expose sensitive information
  const publicInvitation = {
    id: invitation.id,
    group: invitation.groups,
    inviter: invitation.users,
    message: invitation.message,
    expires_at: invitation.expires_at,
    created_at: invitation.created_at
  };

  res.json(publicInvitation);
}));

// Accept invitation by token
router.post('/accept/token/:token', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { token } = req.params;
  
  if (!token) {
    throw createError('Token is required', 400);
  }

  // Get and validate invitation
  const invitation = await InvitationService.getInvitationByToken(token);
  
  // Accept invitation
  const result = await InvitationService.acceptInvitation(invitation.id, req.user!.id);

  res.json({
    message: 'Successfully joined group',
    group_id: result.group_id,
    membership_id: result.membership_id
  });
}));

// Accept invitation by code
router.post('/accept/code/:code', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { code } = req.params;
  
  if (!code) {
    throw createError('Code is required', 400);
  }

  // Get and validate invitation
  const invitation = await InvitationService.getInvitationByCode(code);
  
  // Accept invitation
  const result = await InvitationService.acceptInvitation(invitation.id, req.user!.id);

  res.json({
    message: 'Successfully joined group',
    group_id: result.group_id,
    membership_id: result.membership_id
  });
}));

// Get group invitations (admin only)
router.get('/group/:groupId', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { groupId } = req.params;
  
  if (!groupId) {
    throw createError('Group ID is required', 400);
  }

  const invitations = await InvitationService.getGroupInvitations(groupId, req.user!.id);
  
  // Add invite links to each invitation
  const invitationsWithLinks = invitations.map(invitation => ({
    ...invitation,
    links: {
      secure_link: InvitationService.generateInviteLink(invitation.invite_token),
      code_link: InvitationService.generateCodeLink(invitation.invite_code)
    }
  }));

  res.json(invitationsWithLinks);
}));

// Revoke invitation
router.patch('/:invitationId/revoke', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { invitationId } = req.params;
  
  if (!invitationId) {
    throw createError('Invitation ID is required', 400);
  }

  await InvitationService.revokeInvitation(invitationId, req.user!.id);

  res.json({ message: 'Invitation revoked successfully' });
}));

// Generate new invite link for existing group (quick action)
router.post('/quick/:groupId', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { groupId } = req.params;
  const { expires_in_hours = 168 } = req.body; // Default 7 days
  
  if (!groupId) {
    throw createError('Group ID is required', 400);
  }

  const invitation = await InvitationService.createInvitation(req.user!.id, {
    group_id: groupId,
    expires_in_hours
  });
  
  const inviteLink = InvitationService.generateInviteLink(invitation.invite_token);
  const codeLink = InvitationService.generateCodeLink(invitation.invite_code);

  res.status(201).json({
    invitation,
    links: {
      secure_link: inviteLink,
      code_link: codeLink
    }
  });
}));

// Get invitation analytics for a group (admin only)
router.get('/analytics/:groupId', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { groupId } = req.params;
  
  if (!groupId) {
    throw createError('Group ID is required', 400);
  }

  const invitations = await InvitationService.getGroupInvitations(groupId, req.user!.id);
  
  // Calculate analytics
  const total = invitations.length;
  const pending = invitations.filter(inv => inv.status === 'pending').length;
  const accepted = invitations.filter(inv => inv.status === 'accepted').length;
  const expired = invitations.filter(inv => inv.status === 'expired').length;
  const revoked = invitations.filter(inv => inv.status === 'revoked').length;
  
  const acceptanceRate = total > 0 ? (accepted / total * 100).toFixed(1) : '0.0';
  
  // Recent invitations (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentInvitations = invitations.filter(inv => 
    new Date(inv.created_at) > sevenDaysAgo
  ).length;

  res.json({
    summary: {
      total,
      pending,
      accepted,
      expired,
      revoked,
      acceptance_rate: `${acceptanceRate}%`,
      recent_invitations: recentInvitations
    },
    status_breakdown: {
      pending: `${pending}/${total}`,
      accepted: `${accepted}/${total}`,
      expired: `${expired}/${total}`,
      revoked: `${revoked}/${total}`
    }
  });
}));

export default router;