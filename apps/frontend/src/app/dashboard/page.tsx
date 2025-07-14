"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { ConnectWallet } from "@/components/wallet/connect-wallet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useGroups } from "@/hooks/use-groups";
import { WalletConnection } from "@/lib/stellar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ApiClient } from "@/lib/api";
import Link from "next/link";
import {
  Plus,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  LogOut,
  Wallet,
  ChevronRight,
  UserPlus,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [walletConnection, setWalletConnection] =
    useState<WalletConnection | null>(null);
  const {
    groups,
    isLoading: groupsLoading,
    error: groupsError,
    refetch,
  } = useGroups();

  const [isLoading, setIsLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const { toast } = useToast();

  const loadDashboardData = async () => {
    try {
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = "/auth/login";
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleWalletConnect = (connection: WalletConnection) => {
    setWalletConnection(connection);
    toast({
      title: "Wallet Connected",
      description: `Connected to ${connection.publicKey}`,
    });
  };

  const handleWalletDisconnect = () => {
    setWalletConnection(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter an invitation code",
        variant: "destructive",
      });
      return;
    }

    setIsJoining(true);
    try {
      const result = await ApiClient.joinGroup(inviteCode.trim().toUpperCase());

      toast({
        title: "Success! 🎉",
        description: `You've joined the group successfully!`,
      });

      setInviteCode("");
      refetch(); // Refresh groups list
    } catch (error: any) {
      console.error("Error joining group:", error);

      let errorMessage = "Failed to join group. Please try again.";

      if (error.message?.includes("Invalid invite code")) {
        errorMessage = "Invalid invitation code. Please check and try again.";
      } else if (error.message?.includes("Already a member")) {
        errorMessage = "You're already a member of this group.";
      } else if (error.message?.includes("maximum member limit")) {
        errorMessage = "This group has reached its maximum member limit.";
      } else if (error.message?.includes("not active")) {
        errorMessage = "This group is no longer active.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Failed to Join Group",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const totalBalance = groups.reduce(
    (sum, group) => sum + group.user_balance,
    0
  );
  const totalYield = groups.reduce(
    (sum, group) => sum + group.total_balance * 0.05,
    0
  ); // Mock yield calculation

  if (groupsLoading || isLoading) {
    return (
      <AuthWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  if (groupsError) {
    return (
      <AuthWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              Error loading groups: {groupsError}
            </p>
            <Button onClick={refetch} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Wallet className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    Community Wallet
                  </div>
                  <div className="text-sm text-gray-500">
                    Welcome back, {user?.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(totalBalance)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Groups
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{groups.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across all your savings groups
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Yield
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(totalYield)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Connection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Stellar Wallet</CardTitle>
              <CardDescription>
                Connect your Stellar wallet to make contributions and
                withdrawals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConnectWallet
                onConnection={handleWalletConnect}
                showBalance={true}
              />
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Your Groups */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Groups</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Link href="/groups/new">
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Group
                      </Button>
                    </Link>
                  </div>
                </div>
                <CardDescription>
                  Manage your existing groups and create new ones
                </CardDescription>
              </CardHeader>
              <CardContent>
                {groups.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No groups yet</p>
                    <Link href="/groups/new">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Group
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {groups.map((group) => {
                      console.log("group", group);
                      return (
                        <Link
                          key={group.group_id}
                          href={`/groups/${group.group_id}`}
                          className="block"
                        >
                          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">
                                  {group.group_name}
                                </h3>
                                <Badge
                                  variant={
                                    group.role === "admin"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {group.role}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                                <span>{group.member_count} members</span>
                                <span>
                                  Your balance:{" "}
                                  {formatCurrency(group.user_balance)}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-gray-600">
                                Total: {formatCurrency(group.total_balance)}
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Join with Invitation Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                  <span>Join with Invitation Code</span>
                </CardTitle>
                <CardDescription>
                  Enter a 6-character invitation code to join an existing group
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoinGroup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="inviteCode">Invitation Code</Label>
                    <Input
                      id="inviteCode"
                      placeholder="Enter code (e.g., FGP2YT)"
                      value={inviteCode}
                      onChange={(e) =>
                        setInviteCode(e.target.value.toUpperCase())
                      }
                      className="font-mono text-center tracking-wider text-lg"
                      maxLength={6}
                      disabled={isJoining}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Enter the 6-character invitation code shared with you
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!inviteCode.trim() || isJoining}
                  >
                    {isJoining ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Joining Group...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Group
                      </>
                    )}
                  </Button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium">
                          How it works
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          When you join a group, you'll become a member and can
                          start contributing to the shared savings pool. Group
                          admins can invite members by sharing invitation codes.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
