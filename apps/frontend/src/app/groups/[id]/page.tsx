'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { ConnectWallet } from '@/components/wallet/connect-wallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { WalletConnection } from '@/lib/stellar';
import { formatCurrency, formatDate, truncateAddress } from '@/lib/utils';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  Copy,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Calendar,
  Wallet,
  UserPlus,
  Send,
  Loader2
} from 'lucide-react';

interface GroupMember {
  id: string;
  address: string;
  fullName?: string;
  avatarUrl?: string;
  role: 'admin' | 'member';
  balance: number;
  totalContributed: number;
  yieldEarned: number;
  joinedAt: string;
}

interface Transaction {
  id: string;
  type: 'contribution' | 'withdrawal' | 'yield_distribution';
  amount: number;
  fee: number;
  userId: string;
  userName: string;
  description: string;
  stellarTxId?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
}

interface GroupData {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  inviteCode: string;
  status: 'active' | 'paused' | 'closed';
  settings: {
    minContribution: number;
    maxContribution: number;
    withdrawalRequiresApproval: boolean;
    maxMembers: number;
    autoInvestEnabled: boolean;
  };
  totalBalance: number;
  totalYield: number;
  memberCount: number;
  createdAt: string;
}

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [walletConnection, setWalletConnection] = useState<WalletConnection | null>(null);
  const [group, setGroup] = useState<GroupData | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userMembership, setUserMembership] = useState<GroupMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'transactions'>('overview');
  
  // Contribution form
  const [contributionAmount, setContributionAmount] = useState('');
  const [isContributing, setIsContributing] = useState(false);

  const groupId = params.id as string;

  useEffect(() => {
    if (groupId) {
      loadGroupData();
    }
  }, [groupId]);

  const loadGroupData = async () => {
    setIsLoading(true);
    try {
      // Mock data - replace with actual API calls
      const mockGroup: GroupData = {
        id: groupId,
        name: 'Family Vacation Fund',
        description: 'Saving up for our summer vacation to Europe',
        creatorId: 'user1',
        inviteCode: 'FAM2024',
        status: 'active',
        settings: {
          minContribution: 50,
          maxContribution: 1000,
          withdrawalRequiresApproval: true,
          maxMembers: 10,
          autoInvestEnabled: true,
        },
        totalBalance: 3250.75,
        totalYield: 125.30,
        memberCount: 4,
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      };

      const mockMembers: GroupMember[] = [
        {
          id: '1',
          address: 'GABC123...XYZ789',
          fullName: 'John Doe',
          role: 'admin',
          balance: 1200.50,
          totalContributed: 1150.00,
          yieldEarned: 50.50,
          joinedAt: mockGroup.createdAt,
        },
        {
          id: '2',
          address: 'GDEF456...ABC123',
          fullName: 'Jane Smith',
          role: 'member',
          balance: 850.25,
          totalContributed: 800.00,
          yieldEarned: 50.25,
          joinedAt: new Date(Date.now() - 86400000 * 25).toISOString(),
        },
        {
          id: '3',
          address: 'GHIJ789...DEF456',
          fullName: 'Bob Johnson',
          role: 'member',
          balance: 650.00,
          totalContributed: 625.00,
          yieldEarned: 25.00,
          joinedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
        },
        {
          id: '4',
          address: 'GKLM012...GHI789',
          fullName: 'Alice Brown',
          role: 'member',
          balance: 550.00,
          totalContributed: 530.00,
          yieldEarned: 20.00,
          joinedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        },
      ];

      const mockTransactions: Transaction[] = [
        {
          id: '1',
          type: 'contribution',
          amount: 200,
          fee: 0.1,
          userId: '1',
          userName: 'John Doe',
          description: 'Monthly contribution',
          stellarTxId: 'abc123...def456',
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'yield_distribution',
          amount: 25.75,
          fee: 0,
          userId: 'system',
          userName: 'Blend Protocol',
          description: 'Weekly yield distribution',
          status: 'confirmed',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          type: 'contribution',
          amount: 150,
          fee: 0.1,
          userId: '2',
          userName: 'Jane Smith',
          description: 'Contribution',
          stellarTxId: 'ghi789...jkl012',
          status: 'confirmed',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
      ];

      setGroup(mockGroup);
      setMembers(mockMembers);
      setTransactions(mockTransactions);
      
      // Find current user's membership
      const currentUserMembership = mockMembers.find(m => m.id === '1'); // Mock current user
      setUserMembership(currentUserMembership || null);
      
    } catch (error) {
      console.error('Error loading group data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load group information.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contributionAmount || !walletConnection) {
      toast({
        title: 'Validation Error',
        description: 'Please enter an amount and connect your wallet.',
        variant: 'destructive',
      });
      return;
    }

    const amount = parseFloat(contributionAmount);
    if (amount < (group?.settings.minContribution || 0) || amount > (group?.settings.maxContribution || 0)) {
      toast({
        title: 'Invalid Amount',
        description: `Amount must be between $${group?.settings.minContribution} and $${group?.settings.maxContribution}.`,
        variant: 'destructive',
      });
      return;
    }

    setIsContributing(true);
    try {
      // TODO: Implement actual contribution logic
      console.log('Contributing:', amount);
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: 'Contribution Successful',
        description: `Successfully contributed ${formatCurrency(amount)} to the group.`,
      });
      
      setContributionAmount('');
      loadGroupData(); // Reload data
      
    } catch (error: any) {
      console.error('Error contributing:', error);
      toast({
        title: 'Contribution Failed',
        description: error.message || 'Failed to process contribution.',
        variant: 'destructive',
      });
    } finally {
      setIsContributing(false);
    }
  };

  const copyInviteCode = () => {
    if (group) {
      navigator.clipboard.writeText(group.inviteCode);
      toast({
        title: 'Invite Code Copied',
        description: 'Share this code with others to invite them to the group.',
      });
    }
  };

  if (isLoading) {
    return (
      <AuthWrapper requireAuth={true}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading group...</p>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  if (!group) {
    return (
      <AuthWrapper requireAuth={true}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Group Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The group you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper requireAuth={true}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <div className="h-4 w-px bg-border" />
              <h1 className="text-xl font-bold">{group.name}</h1>
              <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                {group.status}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={copyInviteCode}>
                <Copy className="mr-2 h-4 w-4" />
                {group.inviteCode}
              </Button>
              {userMembership?.role === 'admin' && (
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </header>

        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Group Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(group.totalBalance)}</div>
                    <p className="text-xs text-muted-foreground">
                      +{formatCurrency(group.totalYield)} yield earned
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(userMembership?.balance || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{formatCurrency(userMembership?.yieldEarned || 0)} yield
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Members</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{group.memberCount}</div>
                    <p className="text-xs text-muted-foreground">
                      of {group.settings.maxMembers} max
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <div className="border-b">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('members')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'members'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Members ({group.memberCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'transactions'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Transactions
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {group.description && (
                    <Card>
                      <CardHeader>
                        <CardTitle>About</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{group.description}</p>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>Group Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Contribution Range</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(group.settings.minContribution)} - {formatCurrency(group.settings.maxContribution)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Auto-Investment</p>
                          <p className="text-sm text-muted-foreground">
                            {group.settings.autoInvestEnabled ? 'Enabled' : 'Disabled'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Withdrawal Approval</p>
                          <p className="text-sm text-muted-foreground">
                            {group.settings.withdrawalRequiresApproval ? 'Required' : 'Not Required'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Created</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(group.createdAt)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'members' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Group Members</CardTitle>
                    <CardDescription>
                      Members of {group.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-medium">
                              {member.fullName?.[0] || 'U'}
                            </div>
                            <div>
                              <p className="font-medium">{member.fullName || 'Unknown User'}</p>
                              <p className="text-sm text-muted-foreground">
                                {truncateAddress(member.address)} • 
                                <Badge variant={member.role === 'admin' ? 'default' : 'secondary'} className="ml-1">
                                  {member.role}
                                </Badge>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(member.balance)}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(member.totalContributed)} contributed
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'transactions' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      All group transactions and activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                              transaction.type === 'contribution' 
                                ? 'bg-blue-100 text-blue-600' 
                                : transaction.type === 'withdrawal'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {transaction.type === 'contribution' ? (
                                <ArrowUpRight className="h-4 w-4" />
                              ) : transaction.type === 'withdrawal' ? (
                                <ArrowDownRight className="h-4 w-4" />
                              ) : (
                                <TrendingUp className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.userName} • {formatDate(transaction.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${
                              transaction.type === 'contribution' 
                                ? 'text-blue-600' 
                                : transaction.type === 'withdrawal'
                                ? 'text-red-600'
                                : 'text-green-600'
                            }`}>
                              {transaction.type === 'withdrawal' ? '-' : '+'}
                              {formatCurrency(transaction.amount)}
                            </p>
                            <Badge variant={
                              transaction.status === 'confirmed' ? 'default' :
                              transaction.status === 'pending' ? 'secondary' : 'destructive'
                            }>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wallet Connection */}
              <ConnectWallet 
                onConnection={setWalletConnection}
                showBalance={true}
              />

              {/* Quick Actions */}
              {walletConnection && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contribute Funds</CardTitle>
                    <CardDescription>
                      Add money to the group savings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContribute} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (USDC)</Label>
                        <Input
                          id="amount"
                          type="number"
                          min={group.settings.minContribution}
                          max={group.settings.maxContribution}
                          step="0.01"
                          placeholder="0.00"
                          value={contributionAmount}
                          onChange={(e) => setContributionAmount(e.target.value)}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Min: {formatCurrency(group.settings.minContribution)} • 
                          Max: {formatCurrency(group.settings.maxContribution)}
                        </p>
                      </div>
                      <Button type="submit" disabled={isContributing} className="w-full">
                        {isContributing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Contributing...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Contribute
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Group Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Group Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Invite Code</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                        {group.inviteCode}
                      </code>
                      <Button variant="ghost" size="sm" onClick={copyInviteCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Your Role</p>
                    <Badge variant={userMembership?.role === 'admin' ? 'default' : 'secondary'}>
                      {userMembership?.role || 'member'}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(userMembership?.joinedAt || group.createdAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}