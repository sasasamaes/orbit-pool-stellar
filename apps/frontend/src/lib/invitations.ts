export interface Invitation {
  id: string;
  group_id: string;
  inviter_id: string;
  invite_token: string;
  invite_code: string;
  email?: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  expires_at: string;
  used_at?: string;
  used_by?: string;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface InvitationWithLinks extends Invitation {
  links: {
    secure_link: string;
    code_link: string;
  };
}

export interface PublicInvitation {
  id: string;
  group: {
    id: string;
    name: string;
    description?: string;
    member_count: number;
    settings: any;
  };
  inviter: {
    full_name?: string;
    avatar_url?: string;
  };
  message?: string;
  expires_at: string;
  created_at: string;
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

export interface InvitationAnalytics {
  summary: {
    total: number;
    pending: number;
    accepted: number;
    expired: number;
    revoked: number;
    acceptance_rate: string;
    recent_invitations: number;
  };
  status_breakdown: {
    pending: string;
    accepted: string;
    expired: string;
    revoked: string;
  };
}

export class InvitationService {
  private static readonly API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  /**
   * Get authorization headers
   */
  private static getAuthHeaders(): HeadersInit {
    // TODO: Replace with actual auth token from Supabase session
    const token = localStorage.getItem('supabase.auth.token') || '';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Create a new invitation
   */
  static async createInvitation(data: CreateInvitationRequest): Promise<InvitationWithLinks> {
    const response = await fetch(`${this.API_BASE}/invitations`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create invitation');
    }

    return response.json();
  }

  /**
   * Send email invitation
   */
  static async sendEmailInvitation(data: SendEmailInvitationRequest): Promise<{
    invitation: InvitationWithLinks;
    email_sent: boolean;
  }> {
    if (!this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    const response = await fetch(`${this.API_BASE}/invitations/email`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email invitation');
    }

    return response.json();
  }

  /**
   * Get invitation by token (public)
   */
  static async getInvitationByToken(token: string): Promise<PublicInvitation> {
    const response = await fetch(`${this.API_BASE}/invitations/token/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid invitation link');
    }

    return response.json();
  }

  /**
   * Get invitation by code (public)
   */
  static async getInvitationByCode(code: string): Promise<PublicInvitation> {
    const response = await fetch(`${this.API_BASE}/invitations/code/${code}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid invitation code');
    }

    return response.json();
  }

  /**
   * Accept invitation by token
   */
  static async acceptInvitationByToken(token: string): Promise<{
    message: string;
    group_id: string;
    membership_id: string;
  }> {
    const response = await fetch(`${this.API_BASE}/invitations/accept/token/${token}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to accept invitation');
    }

    return response.json();
  }

  /**
   * Accept invitation by code
   */
  static async acceptInvitationByCode(code: string): Promise<{
    message: string;
    group_id: string;
    membership_id: string;
  }> {
    const response = await fetch(`${this.API_BASE}/invitations/accept/code/${code}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to accept invitation');
    }

    return response.json();
  }

  /**
   * Get group invitations (admin only)
   */
  static async getGroupInvitations(groupId: string): Promise<InvitationWithLinks[]> {
    const response = await fetch(`${this.API_BASE}/invitations/group/${groupId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch invitations');
    }

    return response.json();
  }

  /**
   * Revoke invitation
   */
  static async revokeInvitation(invitationId: string): Promise<void> {
    const response = await fetch(`${this.API_BASE}/invitations/${invitationId}/revoke`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to revoke invitation');
    }
  }

  /**
   * Create quick invitation (admin shortcut)
   */
  static async createQuickInvitation(
    groupId: string,
    expiresInHours: number = 168
  ): Promise<InvitationWithLinks> {
    const response = await fetch(`${this.API_BASE}/invitations/quick/${groupId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ expires_in_hours: expiresInHours }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create quick invitation');
    }

    return response.json();
  }

  /**
   * Get invitation analytics
   */
  static async getInvitationAnalytics(groupId: string): Promise<InvitationAnalytics> {
    const response = await fetch(`${this.API_BASE}/invitations/analytics/${groupId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch analytics');
    }

    return response.json();
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Format invitation status for display
   */
  static formatInvitationStatus(status: Invitation['status']): {
    label: string;
    color: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  } {
    switch (status) {
      case 'pending':
        return { label: 'Pending', color: 'text-yellow-600', variant: 'outline' };
      case 'accepted':
        return { label: 'Accepted', color: 'text-green-600', variant: 'default' };
      case 'expired':
        return { label: 'Expired', color: 'text-gray-600', variant: 'secondary' };
      case 'revoked':
        return { label: 'Revoked', color: 'text-red-600', variant: 'destructive' };
      default:
        return { label: 'Unknown', color: 'text-gray-600', variant: 'outline' };
    }
  }

  /**
   * Calculate time until expiry
   */
  static getTimeUntilExpiry(expiresAt: string): {
    isExpired: boolean;
    timeLeft: string;
    urgency: 'high' | 'medium' | 'low';
  } {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffMs = expiry.getTime() - now.getTime();

    if (diffMs <= 0) {
      return { isExpired: true, timeLeft: 'Expired', urgency: 'high' };
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    let timeLeft: string;
    let urgency: 'high' | 'medium' | 'low';

    if (diffDays > 0) {
      timeLeft = `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
      urgency = diffDays <= 1 ? 'medium' : 'low';
    } else if (diffHours > 0) {
      timeLeft = `${diffHours} hour${diffHours > 1 ? 's' : ''} left`;
      urgency = diffHours <= 6 ? 'high' : 'medium';
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      timeLeft = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} left`;
      urgency = 'high';
    }

    return { isExpired: false, timeLeft, urgency };
  }

  /**
   * Copy text to clipboard
   */
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  /**
   * Share invitation via Web Share API or fallback to clipboard
   */
  static async shareInvitation(invitation: {
    groupName: string;
    inviteLink: string;
    message?: string;
  }): Promise<boolean> {
    const shareData = {
      title: `Join "${invitation.groupName}" on OrbitPool`,
      text: invitation.message || `You're invited to join our savings group!`,
      url: invitation.inviteLink,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return true;
      } else {
        // Fallback to clipboard
        const shareText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
        return await this.copyToClipboard(shareText);
      }
    } catch (error) {
      console.error('Failed to share invitation:', error);
      return false;
    }
  }

  /**
   * Generate QR code data URL for invitation
   */
  static generateQRCodeData(inviteLink: string): string {
    // TODO: Integrate with QR code library
    // For now, return a placeholder
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inviteLink)}`;
  }

  /**
   * Validate invitation expiry time
   */
  static validateExpiryHours(hours: number): boolean {
    return hours >= 1 && hours <= 720; // 1 hour to 30 days
  }

  /**
   * Get default expiry options
   */
  static getExpiryOptions(): Array<{ label: string; value: number }> {
    return [
      { label: '1 hour', value: 1 },
      { label: '6 hours', value: 6 },
      { label: '1 day', value: 24 },
      { label: '3 days', value: 72 },
      { label: '1 week', value: 168 },
      { label: '2 weeks', value: 336 },
      { label: '1 month', value: 720 },
    ];
  }
}