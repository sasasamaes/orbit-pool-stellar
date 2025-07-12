import { supabase } from "../index";
import { createError } from "../middleware/errorHandler";
import crypto from "crypto";

export interface InvitationData {
  id: string;
  group_id: string;
  inviter_id: string;
  invite_token: string;
  invite_code: string;
  email?: string;
  message?: string;
  status: "pending" | "accepted" | "expired" | "revoked";
  expires_at: string;
  created_at: string;
  used_at?: string;
  used_by?: string;
}

export interface InvitationWithJoins extends InvitationData {
  groups: {
    id: string;
    name: string;
    description: string;
    member_count: number;
    settings: any;
  };
  users: {
    full_name: string;
    email: string;
    avatar_url?: string;
  };
}

export interface CreateInvitationRequest {
  group_id: string;
  email?: string;
  expires_in_hours?: number;
  message?: string;
}

export interface SendEmailInvitationRequest extends CreateInvitationRequest {
  email: string;
}

export class InvitationService {
  private static readonly DEFAULT_EXPIRY_HOURS = 168; // 7 days
  private static readonly MAX_EXPIRY_HOURS = 720; // 30 days

  /**
   * Generate a secure invite token
   */
  static generateInviteToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Generate a short invite code (for manual sharing)
   */
  static generateInviteCode(): string {
    return crypto.randomBytes(4).toString("hex").toUpperCase();
  }

  /**
   * Create a new invitation
   */
  static async createInvitation(
    inviter_id: string,
    data: CreateInvitationRequest
  ): Promise<InvitationData> {
    const {
      group_id,
      email,
      expires_in_hours = this.DEFAULT_EXPIRY_HOURS,
      message,
    } = data;

    // Validate expiry time
    const expiryHours = Math.min(expires_in_hours, this.MAX_EXPIRY_HOURS);
    const expires_at = new Date(
      Date.now() + expiryHours * 60 * 60 * 1000
    ).toISOString();

    // Verify inviter is group admin
    const { data: membership } = await supabase
      .from("group_memberships")
      .select("role")
      .eq("group_id", group_id)
      .eq("user_id", inviter_id)
      .eq("status", "active")
      .single();

    if (!membership || membership.role !== "admin") {
      throw createError(
        "Only group administrators can create invitations",
        403
      );
    }

    // Check if group exists and is active
    const { data: group, error: groupError } = await supabase
      .from("groups")
      .select("id, name, status, member_count, settings")
      .eq("id", group_id)
      .single();

    if (groupError || !group) {
      throw createError("Group not found", 404);
    }

    if (group.status !== "active") {
      throw createError("Cannot create invitations for inactive groups", 400);
    }

    // Check if group has space for new members
    if (group.member_count >= group.settings.max_members) {
      throw createError("Group has reached maximum member limit", 400);
    }

    // If email is provided, check if user already exists or has pending invitation
    if (email) {
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (existingUser) {
        // Check if already a member
        const { data: existingMembership } = await supabase
          .from("group_memberships")
          .select("status")
          .eq("group_id", group_id)
          .eq("user_id", existingUser.id)
          .single();

        if (existingMembership?.status === "active") {
          throw createError("User is already a member of this group", 400);
        }
      }

      // Check for existing pending invitation
      const { data: existingInvitation } = await supabase
        .from("invitations")
        .select("id, status")
        .eq("group_id", group_id)
        .eq("email", email)
        .eq("status", "pending")
        .single();

      if (existingInvitation) {
        throw createError(
          "Pending invitation already exists for this email",
          400
        );
      }
    }

    // Create invitation
    const invite_token = this.generateInviteToken();
    const invite_code = this.generateInviteCode();

    const { data: invitation, error } = await supabase
      .from("invitations")
      .insert({
        group_id,
        inviter_id,
        invite_token,
        invite_code,
        email,
        expires_at,
        message,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      throw createError("Failed to create invitation", 500);
    }

    return invitation;
  }

  /**
   * Send email invitation
   */
  static async sendEmailInvitation(
    inviter_id: string,
    data: SendEmailInvitationRequest
  ): Promise<{ invitation: InvitationData; email_sent: boolean }> {
    // Create invitation first
    const invitation = await this.createInvitation(inviter_id, data);

    // Get group and inviter details
    const { data: groupData } = await supabase
      .from("groups")
      .select("name")
      .eq("id", data.group_id)
      .single();

    const { data: inviterData } = await supabase
      .from("users")
      .select("full_name, email")
      .eq("id", inviter_id)
      .single();

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, we'll simulate email sending
    const emailSent = await this.simulateEmailSend({
      to: data.email,
      subject: `You're invited to join "${groupData?.name}" on Community Wallet`,
      inviterName: inviterData?.full_name || "Someone",
      groupName: groupData?.name || "a group",
      inviteLink: this.generateInviteLink(invitation.invite_token),
      inviteCode: invitation.invite_code,
      message: data.message,
    });

    return {
      invitation,
      email_sent: emailSent,
    };
  }

  /**
   * Generate shareable invite link
   */
  static generateInviteLink(token: string): string {
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    return `${baseUrl}/join/${token}`;
  }

  /**
   * Generate short invite link with code
   */
  static generateCodeLink(code: string): string {
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    return `${baseUrl}/join?code=${code}`;
  }

  /**
   * Validate and get invitation by token
   */
  static async getInvitationByToken(
    token: string
  ): Promise<InvitationWithJoins> {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select(
        `
        *,
        groups(id, name, description, member_count, settings),
        users!inviter_id(full_name, email, avatar_url)
      `
      )
      .eq("invite_token", token)
      .single();

    if (error || !invitation) {
      throw createError("Invalid invitation link", 404);
    }

    if (invitation.status !== "pending") {
      throw createError("Invitation is no longer valid", 400);
    }

    if (new Date(invitation.expires_at) < new Date()) {
      // Mark as expired
      await supabase
        .from("invitations")
        .update({ status: "expired" })
        .eq("id", invitation.id);

      throw createError("Invitation has expired", 400);
    }

    return invitation;
  }

  /**
   * Validate and get invitation by code
   */
  static async getInvitationByCode(code: string): Promise<InvitationWithJoins> {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select(
        `
        *,
        groups(id, name, description, member_count, settings),
        users!inviter_id(full_name, email, avatar_url)
      `
      )
      .eq("invite_code", code.toUpperCase())
      .eq("status", "pending")
      .single();

    if (error || !invitation) {
      throw createError("Invalid invitation code", 404);
    }

    if (new Date(invitation.expires_at) < new Date()) {
      // Mark as expired
      await supabase
        .from("invitations")
        .update({ status: "expired" })
        .eq("id", invitation.id);

      throw createError("Invitation has expired", 400);
    }

    return invitation;
  }

  /**
   * Accept invitation and join group
   */
  static async acceptInvitation(
    invitation_id: string,
    user_id: string
  ): Promise<{ group_id: string; membership_id: string }> {
    // Get invitation details
    const { data: invitation, error: inviteError } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", invitation_id)
      .eq("status", "pending")
      .single();

    if (inviteError || !invitation) {
      throw createError("Invitation not found or already used", 404);
    }

    // Check if expired
    if (new Date(invitation.expires_at) < new Date()) {
      await supabase
        .from("invitations")
        .update({ status: "expired" })
        .eq("id", invitation_id);

      throw createError("Invitation has expired", 400);
    }

    // Check if user is already a member
    const { data: existingMembership } = await supabase
      .from("group_memberships")
      .select("id, status")
      .eq("group_id", invitation.group_id)
      .eq("user_id", user_id)
      .single();

    if (existingMembership?.status === "active") {
      throw createError("Already a member of this group", 400);
    }

    // Get group details
    const { data: group } = await supabase
      .from("groups")
      .select("member_count, settings, status")
      .eq("id", invitation.group_id)
      .single();

    if (!group || group.status !== "active") {
      throw createError("Group is not available", 400);
    }

    if (group.member_count >= group.settings.max_members) {
      throw createError("Group has reached maximum member limit", 400);
    }

    // Create or reactivate membership
    let membership_id: string;

    if (existingMembership) {
      // Reactivate existing membership
      const { data: membership, error: membershipError } = await supabase
        .from("group_memberships")
        .update({ status: "active" })
        .eq("id", existingMembership.id)
        .select("id")
        .single();

      if (membershipError || !membership) {
        throw createError("Failed to reactivate membership", 500);
      }

      membership_id = membership.id;
    } else {
      // Create new membership
      const { data: membership, error: membershipError } = await supabase
        .from("group_memberships")
        .insert({
          group_id: invitation.group_id,
          user_id,
          role: "member",
        })
        .select("id")
        .single();

      if (membershipError || !membership) {
        throw createError("Failed to create membership", 500);
      }

      membership_id = membership.id;

      // Update group member count
      await supabase
        .from("groups")
        .update({ member_count: group.member_count + 1 })
        .eq("id", invitation.group_id);
    }

    // Mark invitation as accepted
    await supabase
      .from("invitations")
      .update({
        status: "accepted",
        used_at: new Date().toISOString(),
        used_by: user_id,
      })
      .eq("id", invitation_id);

    return {
      group_id: invitation.group_id,
      membership_id,
    };
  }

  /**
   * Revoke invitation
   */
  static async revokeInvitation(
    invitation_id: string,
    revoker_id: string
  ): Promise<void> {
    // Get invitation details
    const { data: invitation } = await supabase
      .from("invitations")
      .select("group_id, inviter_id")
      .eq("id", invitation_id)
      .single();

    if (!invitation) {
      throw createError("Invitation not found", 404);
    }

    // Check if user has permission to revoke
    const { data: membership } = await supabase
      .from("group_memberships")
      .select("role")
      .eq("group_id", invitation.group_id)
      .eq("user_id", revoker_id)
      .eq("status", "active")
      .single();

    if (
      !membership ||
      (membership.role !== "admin" && invitation.inviter_id !== revoker_id)
    ) {
      throw createError("Permission denied", 403);
    }

    // Revoke invitation
    const { error } = await supabase
      .from("invitations")
      .update({ status: "revoked" })
      .eq("id", invitation_id);

    if (error) {
      throw createError("Failed to revoke invitation", 500);
    }
  }

  /**
   * Get group invitations (for admins)
   */
  static async getGroupInvitations(
    group_id: string,
    user_id: string
  ): Promise<InvitationData[]> {
    // Verify user is group admin
    const { data: membership } = await supabase
      .from("group_memberships")
      .select("role")
      .eq("group_id", group_id)
      .eq("user_id", user_id)
      .eq("status", "active")
      .single();

    if (!membership || membership.role !== "admin") {
      throw createError("Permission denied", 403);
    }

    const { data: invitations, error } = await supabase
      .from("invitations")
      .select(
        `
        *,
        users!inviter_id(full_name, email, avatar_url),
        users!used_by(full_name, email, avatar_url)
      `
      )
      .eq("group_id", group_id)
      .order("created_at", { ascending: false });

    if (error) {
      throw createError("Failed to fetch invitations", 500);
    }

    return invitations || [];
  }

  /**
   * Simulate email sending (replace with actual email service)
   */
  private static async simulateEmailSend(emailData: {
    to: string;
    subject: string;
    inviterName: string;
    groupName: string;
    inviteLink: string;
    inviteCode: string;
    message?: string;
  }): Promise<boolean> {
    // TODO: Replace with actual email service integration
    console.log("📧 Email invitation would be sent:", {
      to: emailData.to,
      subject: emailData.subject,
      content: {
        inviterName: emailData.inviterName,
        groupName: emailData.groupName,
        inviteLink: emailData.inviteLink,
        inviteCode: emailData.inviteCode,
        message: emailData.message,
      },
    });

    // Simulate async email sending
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true; // Simulate successful send
  }
}
