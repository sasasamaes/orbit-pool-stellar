'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePublicInvitation } from '@/hooks/use-invitations';
import { formatDate, formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  UserPlus,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

export default function JoinPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  // Get token from URL params or code from search params
  const token = params.params?.[0]; // /join/[token]
  const code = searchParams.get('code'); // /join?code=ABC123
  
  const [manualCode, setManualCode] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(!token && !code);

  const {
    invitation,
    isLoading,
    error,
    acceptInvitation,
    isAccepting
  } = usePublicInvitation(token, code || manualCode);

  const handleAcceptInvitation = async () => {
    try {
      const result = await acceptInvitation();
      router.push(`/groups/${result.group_id}`);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      router.push(`/join?code=${manualCode.trim().toUpperCase()}`);
    }
  };

  // Show manual code entry form
  if (showManualEntry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Join a Group</h1>
            <p className="text-muted-foreground">
              Enter an invitation code to join a savings group
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Enter Invitation Code</span>
              </CardTitle>
              <CardDescription>
                Got an invitation code? Enter it below to join the group.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleManualCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Invitation Code</Label>
                  <Input
                    id="code"
                    placeholder="ABC123"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                    className="text-center font-mono text-lg tracking-wider"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-character code you received
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an invitation code?{' '}
              <Link href="/groups/discover" className="text-primary hover:underline">
                Discover groups
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading invitation...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <XCircle className="h-5 w-5" />
              <span>Invalid Invitation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">
                <p className="font-medium mb-1">Invitation Not Found</p>
                <p>{error || 'This invitation link is invalid or has expired.'}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowManualEntry(true)}
              >
                Try Another Code
              </Button>
              <Button asChild className="w-full">
                <Link href="/groups/discover">Browse Groups</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state - show invitation details
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">You're Invited!</h1>
          <p className="text-muted-foreground">
            Join a savings group and start building wealth together
          </p>
        </div>

        {/* Invitation Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>{invitation.group.name}</span>
            </CardTitle>
            {invitation.group.description && (
              <CardDescription>
                {invitation.group.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Group Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {invitation.group.member_count}
                </p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {invitation.group.settings?.max_members || 'Unlimited'}
                </p>
                <p className="text-sm text-muted-foreground">Max Size</p>
              </div>
            </div>

            {/* Inviter Info */}
            {invitation.inviter.full_name && (
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-medium">
                  {invitation.inviter.full_name[0]}
                </div>
                <div>
                  <p className="font-medium">{invitation.inviter.full_name}</p>
                  <p className="text-sm text-muted-foreground">invited you to join</p>
                </div>
              </div>
            )}

            {/* Personal Message */}
            {invitation.message && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 italic">"{invitation.message}"</p>
              </div>
            )}

            {/* Group Rules/Settings */}
            {invitation.group.settings && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Group Settings</span>
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {invitation.group.settings.min_contribution && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Contribution:</span>
                      <span>{formatCurrency(invitation.group.settings.min_contribution)}</span>
                    </div>
                  )}
                  {invitation.group.settings.max_contribution && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Contribution:</span>
                      <span>{formatCurrency(invitation.group.settings.max_contribution)}</span>
                    </div>
                  )}
                  {invitation.group.settings.withdrawal_requires_approval !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Withdrawal Approval:</span>
                      <span>{invitation.group.settings.withdrawal_requires_approval ? 'Required' : 'Not Required'}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Expiry Warning */}
            <div className="flex items-center space-x-2 text-sm text-orange-600">
              <Clock className="h-4 w-4" />
              <span>
                This invitation expires on {formatDate(invitation.expires_at)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <AuthWrapper requireAuth={true}>
            <Button 
              onClick={handleAcceptInvitation}
              disabled={isAccepting}
              className="w-full"
              size="lg"
            >
              {isAccepting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining Group...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Join {invitation.group.name}
                </>
              )}
            </Button>
          </AuthWrapper>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/groups/discover">
              Browse Other Groups
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            By joining this group, you agree to the{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}