import { useState, useEffect, useCallback } from "react";
import {
  InvitationService,
  Invitation,
  InvitationWithLinks,
  PublicInvitation,
  InvitationAnalytics,
  CreateInvitationRequest,
  SendEmailInvitationRequest,
} from "@/lib/invitations";
import { useToast } from "./use-toast";

export interface UseInvitationsReturn {
  // State
  invitations: InvitationWithLinks[];
  analytics: InvitationAnalytics | null;
  isLoading: boolean;
  isProcessing: boolean;
  error: string | null;

  // Actions
  loadInvitations: (groupId: string) => Promise<void>;
  loadAnalytics: (groupId: string) => Promise<void>;
  createInvitation: (
    data: CreateInvitationRequest
  ) => Promise<InvitationWithLinks>;
  sendEmailInvitation: (data: SendEmailInvitationRequest) => Promise<void>;
  createQuickInvitation: (
    groupId: string,
    expiresInHours?: number
  ) => Promise<InvitationWithLinks>;
  revokeInvitation: (invitationId: string) => Promise<void>;
  copyInviteLink: (link: string) => Promise<void>;
  shareInvitation: (
    groupName: string,
    link: string,
    message?: string
  ) => Promise<void>;
  refreshData: () => Promise<void>;
}

export function useInvitations(groupId?: string): UseInvitationsReturn {
  const [invitations, setInvitations] = useState<InvitationWithLinks[]>([]);
  const [analytics, setAnalytics] = useState<InvitationAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentGroupId, setCurrentGroupId] = useState<string | undefined>(
    groupId
  );
  const { toast } = useToast();

  const loadInvitations = useCallback(
    async (targetGroupId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await InvitationService.getGroupInvitations(targetGroupId);
        setInvitations(data);
        setCurrentGroupId(targetGroupId);
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load invitations";
        setError(errorMessage);
        toast({
          title: "Error Loading Invitations",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const loadAnalytics = useCallback(async (targetGroupId: string) => {
    try {
      const data =
        await InvitationService.getInvitationAnalytics(targetGroupId);
      setAnalytics(data);
    } catch (err: any) {
      console.error("Failed to load analytics:", err);
      // Don't show error toast for analytics as it's supplementary data
    }
  }, []);

  const createInvitation = useCallback(
    async (data: CreateInvitationRequest): Promise<InvitationWithLinks> => {
      setIsProcessing(true);
      setError(null);

      try {
        const invitation = await InvitationService.createInvitation(data);

        toast({
          title: "Invitation Created",
          description: "Invitation link has been generated successfully.",
        });

        // Refresh invitations list
        if (currentGroupId === data.group_id) {
          await loadInvitations(data.group_id);
        }

        return invitation;
      } catch (err: any) {
        const errorMessage = err.message || "Failed to create invitation";
        setError(errorMessage);
        toast({
          title: "Failed to Create Invitation",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [currentGroupId, loadInvitations, toast]
  );

  const sendEmailInvitation = useCallback(
    async (data: SendEmailInvitationRequest) => {
      setIsProcessing(true);
      setError(null);

      try {
        const result = await InvitationService.sendEmailInvitation(data);

        toast({
          title: "Email Invitation Sent",
          description: result.email_sent
            ? `Invitation sent to ${data.email} successfully.`
            : "Invitation created but email sending failed.",
          variant: result.email_sent ? "default" : "destructive",
        });

        // Refresh invitations list
        if (currentGroupId === data.group_id) {
          await loadInvitations(data.group_id);
        }
      } catch (err: any) {
        const errorMessage = err.message || "Failed to send email invitation";
        setError(errorMessage);
        toast({
          title: "Failed to Send Invitation",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [currentGroupId, loadInvitations, toast]
  );

  const createQuickInvitation = useCallback(
    async (
      targetGroupId: string,
      expiresInHours: number = 168
    ): Promise<InvitationWithLinks> => {
      setIsProcessing(true);
      setError(null);

      try {
        const invitation = await InvitationService.createQuickInvitation(
          targetGroupId,
          expiresInHours
        );

        toast({
          title: "Quick Invitation Created",
          description: "Share this link to invite new members.",
        });

        // Refresh invitations list
        if (currentGroupId === targetGroupId) {
          await loadInvitations(targetGroupId);
        }

        return invitation;
      } catch (err: any) {
        const errorMessage = err.message || "Failed to create quick invitation";
        setError(errorMessage);
        toast({
          title: "Failed to Create Invitation",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [currentGroupId, loadInvitations, toast]
  );

  const revokeInvitation = useCallback(
    async (invitationId: string) => {
      setIsProcessing(true);
      setError(null);

      try {
        await InvitationService.revokeInvitation(invitationId);

        toast({
          title: "Invitation Revoked",
          description: "The invitation link is no longer valid.",
        });

        // Refresh invitations list
        if (currentGroupId) {
          await loadInvitations(currentGroupId);
        }
      } catch (err: any) {
        const errorMessage = err.message || "Failed to revoke invitation";
        setError(errorMessage);
        toast({
          title: "Failed to Revoke Invitation",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [currentGroupId, loadInvitations, toast]
  );

  const copyInviteLink = useCallback(
    async (link: string) => {
      try {
        const success = await InvitationService.copyToClipboard(link);

        if (success) {
          toast({
            title: "Link Copied",
            description: "Invitation link copied to clipboard.",
          });
        } else {
          toast({
            title: "Copy Failed",
            description: "Could not copy link to clipboard.",
            variant: "destructive",
          });
        }
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Failed to copy link to clipboard.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const shareInvitation = useCallback(
    async (groupName: string, link: string, message?: string) => {
      try {
        const success = await InvitationService.shareInvitation({
          groupName,
          inviteLink: link,
          message,
        });

        if (success) {
          toast({
            title: "Invitation Shared",
            description: "Invitation has been shared successfully.",
          });
        } else {
          toast({
            title: "Share Failed",
            description: "Could not share invitation.",
            variant: "destructive",
          });
        }
      } catch (err) {
        toast({
          title: "Share Failed",
          description: "Failed to share invitation.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const refreshData = useCallback(async () => {
    if (currentGroupId) {
      loadInvitations(currentGroupId);
      loadAnalytics(currentGroupId);
    }
  }, [currentGroupId, loadInvitations, loadAnalytics]);

  // Load initial data when the component mounts or groupId changes
  useEffect(() => {
    if (groupId) {
      setCurrentGroupId(groupId);
      loadInvitations(groupId);
      loadAnalytics(groupId);
    }
  }, [groupId, loadInvitations, loadAnalytics]);

  return {
    // State
    invitations,
    analytics,
    isLoading,
    isProcessing,
    error,

    // Actions
    loadInvitations,
    loadAnalytics,
    createInvitation,
    sendEmailInvitation,
    createQuickInvitation,
    revokeInvitation,
    copyInviteLink,
    shareInvitation,
    refreshData,
  };
}

// Hook for public invitation views (join page)
export interface UsePublicInvitationReturn {
  invitation: PublicInvitation | null;
  isLoading: boolean;
  error: string | null;
  acceptInvitation: () => Promise<{ group_id: string; membership_id: string }>;
  isAccepting: boolean;
}

export function usePublicInvitation(
  token?: string,
  code?: string
): UsePublicInvitationReturn {
  const [invitation, setInvitation] = useState<PublicInvitation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadInvitation = useCallback(async () => {
    if (!token && !code) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = token
        ? await InvitationService.getInvitationByToken(token)
        : await InvitationService.getInvitationByCode(code!);

      setInvitation(data);
    } catch (err: any) {
      const errorMessage = err.message || "Invalid invitation";
      setError(errorMessage);
      setInvitation(null);
    } finally {
      setIsLoading(false);
    }
  }, [token, code]);

  const acceptInvitation = useCallback(async (): Promise<{
    group_id: string;
    membership_id: string;
  }> => {
    if (!token && !code) {
      throw new Error("No invitation token or code provided");
    }

    setIsAccepting(true);

    try {
      const result = token
        ? await InvitationService.acceptInvitationByToken(token)
        : await InvitationService.acceptInvitationByCode(code!);

      toast({
        title: "Welcome to the Group!",
        description: result.message,
      });

      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to accept invitation";
      toast({
        title: "Failed to Join Group",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsAccepting(false);
    }
  }, [token, code, toast]);

  useEffect(() => {
    loadInvitation();
  }, [loadInvitation]);

  return {
    invitation,
    isLoading,
    error,
    acceptInvitation,
    isAccepting,
  };
}
