'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { InvitationService, CreateInvitationRequest, SendEmailInvitationRequest } from '@/lib/invitations';
import { 
  Mail, 
  Link2, 
  Clock, 
  Copy, 
  Share2,
  Send,
  Loader2,
  UserPlus,
  QrCode
} from 'lucide-react';

interface CreateInvitationProps {
  groupId: string;
  groupName: string;
  onInvitationCreated?: (invitation: any) => void;
  onEmailSent?: (result: any) => void;
}

export function CreateInvitation({ 
  groupId, 
  groupName, 
  onInvitationCreated,
  onEmailSent 
}: CreateInvitationProps) {
  const [invitationType, setInvitationType] = useState<'link' | 'email'>('link');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [expiresInHours, setExpiresInHours] = useState('168'); // 7 days default
  const [isCreating, setIsCreating] = useState(false);
  const [createdInvitation, setCreatedInvitation] = useState<any>(null);

  const expiryOptions = InvitationService.getExpiryOptions();

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const baseData = {
        group_id: groupId,
        expires_in_hours: parseInt(expiresInHours),
        message: message.trim() || undefined,
      };

      if (invitationType === 'email') {
        if (!email.trim()) {
          throw new Error('Email is required');
        }

        if (!InvitationService.isValidEmail(email)) {
          throw new Error('Invalid email format');
        }

        const emailData: SendEmailInvitationRequest = {
          ...baseData,
          email: email.trim(),
        };

        // This would call the API through a hook
        console.log('Sending email invitation:', emailData);
        onEmailSent?.({ email_sent: true, invitation: emailData });
        
        // Reset form
        setEmail('');
        setMessage('');
      } else {
        const linkData: CreateInvitationRequest = baseData;
        
        // Mock invitation creation
        const mockInvitation = {
          id: 'inv_' + Math.random().toString(36).substr(2, 9),
          ...linkData,
          invite_token: Math.random().toString(36).substr(2, 32),
          invite_code: Math.random().toString(36).substr(2, 6).toUpperCase(),
          status: 'pending',
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + parseInt(expiresInHours) * 60 * 60 * 1000).toISOString(),
          links: {
            secure_link: `${window.location.origin}/join/${Math.random().toString(36).substr(2, 32)}`,
            code_link: `${window.location.origin}/join?code=${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          }
        };

        setCreatedInvitation(mockInvitation);
        onInvitationCreated?.(mockInvitation);
        
        // Reset form
        setMessage('');
      }
    } catch (error: any) {
      console.error('Error creating invitation:', error);
      // Error would be handled by the hook
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Success feedback would be handled by the hook
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareInvitation = async (link: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Join "${groupName}" on OrbitPool`,
          text: message || `You're invited to join our savings group!`,
          url: link,
        });
      } else {
        await copyToClipboard(link);
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Invite New Members</span>
          </CardTitle>
          <CardDescription>
            Invite people to join "{groupName}" and start saving together
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateInvitation} className="space-y-6">
            {/* Invitation Type Selector */}
            <div className="space-y-3">
              <Label>Invitation Type</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={invitationType === 'link' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setInvitationType('link')}
                  className="flex items-center space-x-2"
                >
                  <Link2 className="h-4 w-4" />
                  <span>Shareable Link</span>
                </Button>
                <Button
                  type="button"
                  variant={invitationType === 'email' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setInvitationType('email')}
                  className="flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Invitation</span>
                </Button>
              </div>
            </div>

            {/* Email Field (only for email invitations) */}
            {invitationType === 'email' && (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="friend@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Expiry Time */}
            <div className="space-y-2">
              <Label htmlFor="expiry">Link Expires In</Label>
              <Select value={expiresInHours} onValueChange={setExpiresInHours}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {expiryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Optional Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Hey! I'd love for you to join our savings group..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                This message will be included in the invitation
              </p>
            </div>

            {/* Create Button */}
            <Button type="submit" disabled={isCreating} className="w-full">
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {invitationType === 'email' ? 'Sending...' : 'Creating...'}
                </>
              ) : (
                <>
                  {invitationType === 'email' ? (
                    <Send className="mr-2 h-4 w-4" />
                  ) : (
                    <Link2 className="mr-2 h-4 w-4" />
                  )}
                  {invitationType === 'email' ? 'Send Email Invitation' : 'Create Invite Link'}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Created Invitation Display */}
      {createdInvitation && invitationType === 'link' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Link2 className="h-5 w-5 text-green-600" />
              <span>Invitation Created!</span>
            </CardTitle>
            <CardDescription>
              Share this link with people you want to invite
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Secure Link */}
            <div className="space-y-2">
              <Label>Secure Invitation Link</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={createdInvitation.links.secure_link}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(createdInvitation.links.secure_link)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareInvitation(createdInvitation.links.secure_link)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Invite Code */}
            <div className="space-y-2">
              <Label>Manual Entry Code</Label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-3 bg-muted rounded-lg text-center">
                  <code className="text-lg font-bold tracking-wider">
                    {createdInvitation.invite_code}
                  </code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(createdInvitation.invite_code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                People can enter this code manually to join
              </p>
            </div>

            {/* Expiry Info */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                Expires {new Date(createdInvitation.expires_at).toLocaleDateString()} at{' '}
                {new Date(createdInvitation.expires_at).toLocaleTimeString()}
              </span>
            </div>

            {/* QR Code Option */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // TODO: Show QR code modal
                console.log('Show QR code for:', createdInvitation.links.secure_link);
              }}
              className="w-full"
            >
              <QrCode className="mr-2 h-4 w-4" />
              Generate QR Code
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}