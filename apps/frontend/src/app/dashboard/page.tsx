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

interface Group {
  id: string;
  name: string;
  member_count: number;
  total_balance: number;
  user_balance: number;
  role: string;
}

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
  const [groups, setGroups] = useState<Group[]>([]);
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
      // Mock data for now - replace with actual API calls
      setGroups([
        {
          id: "1",
          name: "Family Savings",
          member_count: 4,
          total_balance: 2500.75,
          user_balance: 625.19,
          role: "admin",
        },
        {
          id: "2",
          name: "Vacation Fund",
          member_count: 6,
          total_balance: 1850.0,
          user_balance: 308.33,
          role: "member",
        },
      ]);

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
          type: "yield_distribution",
          amount: 12.45,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          description: "Yield distribution",
          group_name: "Vacation Fund",
        },
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalBalance = groups.reduce(
    (sum, group) => sum + group.user_balance,
    0
  );
  const totalGroups = groups.length;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthWrapper requireAuth={true}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
              <h1 className="text-xl font-bold">OrbitPool</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email?.split("@")[0]}
              </span>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Across {totalGroups} groups
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
                    <div className="text-2xl font-bold">{totalGroups}</div>
                    <p className="text-xs text-muted-foreground">
                      1 as admin, {totalGroups - 1} as member
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
                    <div className="text-2xl font-bold">+4.2%</div>
                    <p className="text-xs text-muted-foreground">
                      Via Blend Protocol
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Groups */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Your Groups</CardTitle>
                    <CardDescription>
                      Manage your savings groups and contributions
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/groups/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Group
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {groups.length > 0 ? (
                    <div className="space-y-4">
                      {groups.map((group) => (
                        <Link key={group.id} href={`/groups/${group.id}`}>
                          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer hover:border-primary/20">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium">{group.name}</h3>
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
                              <p className="text-sm text-muted-foreground">
                                {group.member_count} members •{" "}
                                {formatCurrency(group.total_balance)} total
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {formatCurrency(group.user_balance)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Your balance
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No groups yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Create your first savings group or join an existing one.
                      </p>
                      <Button asChild>
                        <Link href="/groups/new">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Your First Group
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest contributions and earnings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-2"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-full ${
                                transaction.type === "contribution"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              {transaction.type === "contribution" ? (
                                <ArrowUpRight className="h-4 w-4" />
                              ) : (
                                <ArrowDownRight className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                {transaction.description}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.group_name} •{" "}
                                {formatDate(transaction.created_at)}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`font-medium ${
                              transaction.type === "contribution"
                                ? "text-blue-600"
                                : "text-green-600"
                            }`}
                          >
                            {transaction.type === "contribution" ? "-" : "+"}
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No recent activity
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wallet Connection */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Stellar Wallet
                </h2>
                <ConnectWallet
                  onConnection={setWalletConnection}
                  showBalance={true}
                />
              </div>

              {/* Quick Actions */}
              {walletConnection && (
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" asChild>
                      <Link href="/groups/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Group
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
