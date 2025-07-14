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
import { useToast } from "@/hooks/use-toast";
import { useGroups } from "@/hooks/use-groups";
import { WalletConnection } from "@/lib/stellar";
import { formatCurrency, formatDate } from "@/lib/utils";
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
} from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  created_at: string;
  description: string;
  group_name: string;
}

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
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Mock transactions for now - replace with actual API calls later
      setRecentTransactions([
        {
          id: "1",
          type: "contribution",
          amount: 100,
          created_at: new Date().toISOString(),
          description: "Monthly contribution",
          group_name: "Family Savings",
        },
        {
          id: "2",
          type: "withdrawal",
          amount: -50,
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          description: "Emergency withdrawal",
          group_name: "Vacation Fund",
        },
        {
          id: "3",
          type: "yield",
          amount: 12.5,
          created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          description: "Monthly yield distribution",
          group_name: "Family Savings",
        },
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                  <Link href="/groups/new">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Group
                    </Button>
                  </Link>
                </div>
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

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {transaction.type === "contribution" ? (
                            <ArrowUpRight className="h-5 w-5 text-green-500" />
                          ) : transaction.type === "withdrawal" ? (
                            <ArrowDownRight className="h-5 w-5 text-red-500" />
                          ) : (
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.group_name} •{" "}
                            {formatDate(transaction.created_at)}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
