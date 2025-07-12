'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  InvitationWithLinks, 
  InvitationService, 
  InvitationAnalytics 
} from '@/lib/invitations';
import { formatDate } from '@/lib/utils';
import { 
  Copy, 
  Share2, 
  MoreHorizontal,
  Clock,
  Mail,
  Link2,
  XCircle,
  Search,
  Filter,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface InvitationListProps {
  invitations: InvitationWithLinks[];
  analytics?: InvitationAnalytics | null;
  isLoading?: boolean;
  onCopyLink?: (link: string) => void;
  onShareInvitation?: (invitation: InvitationWithLinks) => void;
  onRevokeInvitation?: (invitationId: string) => void;
}

export function InvitationList({
  invitations,
  analytics,
  isLoading = false,
  onCopyLink,
  onShareInvitation,
  onRevokeInvitation,
}: InvitationListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'expires_at' | 'status'>('created_at');

  // Filter and sort invitations
  const filteredInvitations = invitations
    .filter(invitation => {
      const matchesSearch = !searchTerm || 
        invitation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invitation.invite_code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || invitation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'created_at') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'expires_at') {
        return new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime();
      } else {
        return a.status.localeCompare(b.status);
      }
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      case 'revoked':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invitations</CardTitle>
          <CardDescription>Loading invitations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-48 bg-muted rounded" />
                    <div className="h-3 w-32 bg-muted rounded" />
                  </div>
                  <div className="h-6 w-16 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Summary */}
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold">{analytics.summary.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-lg font-semibold">{analytics.summary.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                  <p className="text-lg font-semibold">{analytics.summary.accepted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-lg font-semibold">{analytics.summary.acceptance_rate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invitations List */}
      <Card>
        <CardHeader>
          <CardTitle>Invitation History</CardTitle>
          <CardDescription>
            Manage and track all group invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by email or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Latest First</SelectItem>
                <SelectItem value="expires_at">Expires Soon</SelectItem>
                <SelectItem value="status">By Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invitations */}
          {filteredInvitations.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Invitations Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No invitations match your filters.'
                  : 'Create your first invitation to invite members to this group.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInvitations.map((invitation) => {
                const timeInfo = InvitationService.getTimeUntilExpiry(invitation.expires_at);
                const statusInfo = InvitationService.formatInvitationStatus(invitation.status);

                return (
                  <div
                    key={invitation.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        {/* Invitation Info */}
                        <div className="flex items-center space-x-3">
                          {invitation.email ? (
                            <Mail className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Link2 className="h-4 w-4 text-green-600" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">
                              {invitation.email || `Code: ${invitation.invite_code}`}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Created {formatDate(invitation.created_at)}</span>
                              <span>•</span>
                              <span>{timeInfo.timeLeft}</span>
                              {invitation.used_at && (
                                <>
                                  <span>•</span>
                                  <span>Used {formatDate(invitation.used_at)}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Message Preview */}
                        {invitation.message && (
                          <p className="text-sm text-muted-foreground italic pl-7">
                            "{invitation.message}"
                          </p>
                        )}
                      </div>

                      {/* Status and Actions */}
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={statusInfo.variant}
                          className="flex items-center space-x-1"
                        >
                          {getStatusIcon(invitation.status)}
                          <span>{statusInfo.label}</span>
                        </Badge>

                        {/* Action Buttons */}
                        {invitation.status === 'pending' && (
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onCopyLink?.(invitation.links.secure_link)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onShareInvitation?.(invitation)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRevokeInvitation?.(invitation.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expandable Links (for pending invitations) */}
                    {invitation.status === 'pending' && (
                      <div className="mt-3 pt-3 border-t space-y-2">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Link:</span>
                            <code className="flex-1 truncate bg-muted px-2 py-1 rounded">
                              {invitation.links.secure_link}
                            </code>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Code:</span>
                            <code className="bg-muted px-2 py-1 rounded font-mono">
                              {invitation.invite_code}
                            </code>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}