"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { useGroup } from "@/hooks/use-group";
import { WalletConnection } from "@/lib/stellar";
import { formatCurrency, formatDate, truncateAddress } from "@/lib/utils";
import { ApiClient } from "@/lib/api";
import { CreateInvitation } from "@/components/invitations/create-invitation";
import { InvitationList } from "@/components/invitations/invitation-list";
import { useInvitations } from "@/hooks/use-invitations";
import { BlendYieldDashboard } from "@/components/yield/blend-yield-dashboard";
import Link from "next/link";
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
  Loader2,
  ExternalLink,
} from "lucide-react";

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const groupId = Array.isArray(params.id) ? params.id[0] : params.id;
  const {
    group,
    transactions,
    balance,
    isLoading,
    error,
    refetch,
    refetchBalance,
  } = useGroup(groupId);

  const [walletConnection, setWalletConnection] =
    useState<WalletConnection | null>(null);
  const [contributionAmount, setContributionAmount] = useState("");
  const [isContributing, setIsContributing] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [hasUsdcTrustline, setHasUsdcTrustline] = useState<boolean | null>(
    null
  );
  const [isCheckingUSDC, setIsCheckingUSDC] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "members" | "transactions" | "yield" | "invitations"
  >("overview");

  // Get user's membership info from group data
  const userMembership = group?.group_memberships?.find(
    (m) => m.user_id === user?.id
  );
  const isAdmin = userMembership?.role === "admin";

  // Invitations hook
  const {
    invitations,
    isLoading: invitationsLoading,
    error: invitationsError,
    refreshData: refetchInvitations,
  } = useInvitations(groupId);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  // Check USDC balance and trustline when wallet connects
  useEffect(() => {
    if (walletConnection) {
      checkUSDCStatus();
    } else {
      setUsdcBalance(null);
      setHasUsdcTrustline(null);
    }
  }, [walletConnection]);

  const checkUSDCStatus = async () => {
    if (!walletConnection) return;

    setIsCheckingUSDC(true);
    try {
      const { StellarService, USDC_ASSET } = await import("@/lib/stellar");

      // Check account info and balances
      const accountInfo = await StellarService.getAccountInfo(
        walletConnection.publicKey
      );

      // Check if USDC trustline exists
      const usdcBalance = accountInfo.balances.find(
        (balance: any) =>
          balance.asset_code === "USDC" &&
          balance.asset_issuer === USDC_ASSET.getIssuer()
      );

      if (usdcBalance) {
        setHasUsdcTrustline(true);
        setUsdcBalance(parseFloat(usdcBalance.balance));
      } else {
        setHasUsdcTrustline(false);
        setUsdcBalance(null);
      }
    } catch (error) {
      console.error("Error checking USDC status:", error);
      setHasUsdcTrustline(false);
      setUsdcBalance(null);
    } finally {
      setIsCheckingUSDC(false);
    }
  };

  const createUSDCTrustline = async () => {
    if (!walletConnection) return;

    try {
      setIsCheckingUSDC(true);
      const { StellarService } = await import("@/lib/stellar");

      // Create trustline transaction
      const transaction = await StellarService.createUSDCTrustline(
        walletConnection.publicKey
      );

      // Here you would normally sign and submit the transaction using the wallet
      // For now, we'll show a message to the user
      toast({
        title: "Trustline Creation Required",
        description:
          "Please create a USDC trustline in your Stellar wallet first.",
        variant: "default",
      });

      // Recheck status after a moment
      setTimeout(() => {
        checkUSDCStatus();
      }, 2000);
    } catch (error) {
      console.error("Error creating USDC trustline:", error);
      toast({
        title: "Error",
        description:
          "Failed to create USDC trustline. Please try manually in your wallet.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingUSDC(false);
    }
  };

  const makeRealStellarTransaction = async (
    amount: number
  ): Promise<string> => {
    if (!walletConnection || !group) {
      throw new Error("Wallet not connected or group not found");
    }

    try {
      console.log("🔄 Creating Stellar payment transaction...");

      // Import Stellar services
      const { StellarService, USDC_ASSET } = await import("@/lib/stellar");

      // Get or create group's Stellar account
      console.log("🏦 Getting group Stellar account...");
      const destinationAddress = await StellarService.getOrCreateGroupAccount(
        group.id
      );
      console.log("💰 Using group account:", destinationAddress);

      // Build the payment transaction
      const transaction = await StellarService.buildTransaction(
        walletConnection.publicKey,
        [
          StellarService.createPaymentOperation(
            destinationAddress,
            amount.toString(),
            USDC_ASSET
          ),
        ],
        `Contribution to group ${group.name}`
      );

      // Sign transaction using the wallet
      const { ContractService } = await import("@/lib/contract");
      const contractService = new ContractService();
      const walletKit = await contractService.getWalletConnection();

      console.log("🔐 Signing transaction with wallet...");

      // Verificar que tenemos el XDR antes de firmar
      const transactionXDR = transaction.toXDR();
      if (!transactionXDR) {
        throw new Error("Failed to generate transaction XDR");
      }

      console.log(
        "📋 Transaction XDR generated:",
        transactionXDR.substring(0, 50) + "..."
      );

      // Sign the transaction
      const signedTx = await walletKit.signTransaction(transactionXDR, {
        networkPassphrase: "Test SDF Network ; September 2015",
        address: walletConnection.publicKey,
      });

      console.log("✍️ Transaction signed:", !!signedTx.signedTxXdr); // CORREGIDO: Verificar la propiedad correcta

      // Verificar que el wallet devolvió una transacción firmada válida
      if (!signedTx.signedTxXdr) {
        // CORREGIDO: Verificar la propiedad correcta
        throw new Error(
          "Wallet failed to sign transaction or returned invalid signature"
        );
      }

      console.log("📤 Submitting signed transaction to Stellar network...");

      // Submit the transaction
      const result = await StellarService.submitTransaction(
        signedTx.signedTxXdr
      );

      console.log("✅ Stellar transaction submitted:", result.hash);
      return result.hash;
    } catch (error: any) {
      console.error("❌ Error making Stellar transaction:", error);

      // Provide more specific error messages
      let errorMessage = "Unknown error occurred";

      if (error.message?.includes("destination is invalid")) {
        errorMessage = "Invalid destination address for Stellar transaction";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient USDC balance or XLM for transaction fees";
      } else if (error.message?.includes("trustline")) {
        errorMessage = "USDC trustline not established";
      } else if (error.message?.includes("network")) {
        errorMessage = "Network connection error";
      } else if (error.message?.includes("timeout")) {
        errorMessage = "Transaction timeout - please try again";
      } else if (error.message?.includes("User declined")) {
        errorMessage = "Transaction was cancelled by user";
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(`Stellar transaction failed: ${errorMessage}`);
    }
  };

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnection || !group) return;

    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    // Validate amount against group settings
    const minAmount = group.settings.min_contribution || 0;
    const maxAmount = group.settings.max_contribution || 10000;

    if (amount < minAmount || amount > maxAmount) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between ${formatCurrency(minAmount)} and ${formatCurrency(maxAmount)}`,
        variant: "destructive",
      });
      return;
    }

    setIsContributing(true);
    try {
      // Step 1: Make real Stellar transaction
      console.log("🚀 Starting real Stellar transaction...");
      const stellarTxId = await makeRealStellarTransaction(amount);

      console.log("✅ Stellar transaction successful:", stellarTxId);

      // Step 2: Validate and register in backend with blockchain validation
      console.log("📡 Validating transaction on blockchain and registering...");
      const { GroupService } = await import("@/lib/groups");

      const result = await GroupService.contribute(
        {
          groupId: group.id,
          amount: amount,
          tokenAddress:
            "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5", // Testnet USDC
        },
        walletConnection,
        stellarTxId
      );

      console.log("✅ Contribution validated and registered:", result);

      toast({
        title: "Contribution Successful! 🎉",
        description: `You've contributed ${formatCurrency(result.validation.amount)} to ${group.name}. Validated on blockchain. Balance: ${formatCurrency(result.newBalance)}`,
      });

      setContributionAmount("");
      refetch(); // Refresh group data
      refetchBalance(); // Refresh balance data
    } catch (error: any) {
      console.error("❌ Error making contribution:", error);

      let errorMessage = "Failed to process contribution. Please try again.";

      // Handle specific error types
      if (error.message?.includes("Wallet not connected")) {
        errorMessage = "Please connect your wallet and try again.";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient USDC balance in your wallet.";
      } else if (error.message?.includes("Invalid amount")) {
        errorMessage = error.message;
      } else if (error.message?.includes("network")) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Contribution Failed ❌",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsContributing(false);
    }
  };

  const copyInviteCode = () => {
    if (group?.invite_code) {
      navigator.clipboard.writeText(group.invite_code);
      toast({
        title: "Copied!",
        description: "Invite code copied to clipboard",
      });
    }
  };

  // Estado para la dirección Stellar del grupo
  const [groupStellarAddress, setGroupStellarAddress] = useState<string | null>(
    null
  );

  // Generar la dirección Stellar del grupo
  useEffect(() => {
    const getGroupStellarAddress = async () => {
      if (group?.id) {
        try {
          const { StellarService } = await import("@/lib/stellar");
          const address = await StellarService.getOrCreateGroupAccount(
            group.id
          );
          setGroupStellarAddress(address);
        } catch (error) {
          console.error("Error getting group stellar address:", error);
        }
      }
    };

    getGroupStellarAddress();
  }, [group?.id]);

  const copyStellarAddress = () => {
    if (groupStellarAddress) {
      navigator.clipboard.writeText(groupStellarAddress);
      toast({
        title: "Copied!",
        description: "Stellar contract address copied to clipboard",
      });
    }
  };

  const openStellarExplorer = () => {
    if (groupStellarAddress) {
      const explorerUrl = `https://stellar.expert/explorer/testnet/account/${groupStellarAddress}`;
      window.open(explorerUrl, "_blank");
    }
  };

  if (isLoading) {
    return (
      <AuthWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading group details...</p>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  if (error || !group) {
    return (
      <AuthWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              Error loading group: {error || "Group not found"}
            </p>
            <Button onClick={refetch} variant="outline">
              Try Again
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="ghost"
              className="ml-2"
            >
              Back to Dashboard
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
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {group.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {group.member_count} member
                    {group.member_count !== 1 ? "s" : ""} •
                    {isAdmin ? " Admin" : " Member"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={group.status === "active" ? "default" : "secondary"}
                >
                  {group.status}
                </Badge>
                {isAdmin && (
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Group Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(balance?.group_total || group.total_balance)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total contributions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Your Balance
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    balance?.user_balance ||
                      userMembership?.current_balance ||
                      0
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Your contributions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{group.member_count}</div>
                <p className="text-xs text-muted-foreground">
                  Max {group.settings.max_members || 50}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Yield Earned
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(userMembership?.yield_earned || 0)}
                </div>
                <p className="text-xs text-muted-foreground">Your yield</p>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview", icon: DollarSign },
                { id: "members", label: "Members", icon: Users },
                {
                  id: "transactions",
                  label: "Transactions",
                  icon: ArrowUpRight,
                },
                {
                  id: "yield",
                  label: "Yield",
                  icon: TrendingUp,
                },
                ...(isAdmin
                  ? [
                      {
                        id: "invitations",
                        label: "Invitations",
                        icon: UserPlus,
                      },
                    ]
                  : []),
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Group Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Group Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {group.description || "No description provided"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Invite Code</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {group.invite_code}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyInviteCode}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Created</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(group.created_at)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Stellar Contract
                    </Label>
                    <div className="flex items-center space-x-2 mt-1">
                      {groupStellarAddress ? (
                        <>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono flex-1 truncate">
                            {groupStellarAddress}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyStellarAddress}
                            title="Copy address"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={openStellarExplorer}
                            title="View on Stellar Explorer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-gray-500">
                            Loading contract address...
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This is the Stellar account where group funds are stored
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Settings</Label>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      <p>
                        Min contribution:{" "}
                        {formatCurrency(group.settings.min_contribution || 10)}
                      </p>
                      <p>
                        Max contribution:{" "}
                        {formatCurrency(
                          group.settings.max_contribution || 1000
                        )}
                      </p>
                      <p>
                        Auto-invest:{" "}
                        {group.settings.auto_invest_enabled
                          ? "Enabled"
                          : "Disabled"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contribution Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Make a Contribution</CardTitle>
                  <CardDescription>
                    Add funds to the group savings pool
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ConnectWallet
                      onConnection={setWalletConnection}
                      showBalance={true}
                    />

                    {!walletConnection && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Wallet className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-yellow-800 font-medium mb-2">
                              Connect Your Stellar Wallet
                            </p>
                            <p className="text-xs text-yellow-700 mb-3">
                              To contribute to this group, you need to connect a
                              Stellar wallet with USDC.
                            </p>
                            <div className="text-xs text-yellow-700 space-y-1">
                              <p>
                                <strong>Requirements:</strong>
                              </p>
                              <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>
                                  Stellar wallet (like Freighter) installed and
                                  configured
                                </li>
                                <li>USDC trustline established</li>
                                <li>
                                  Sufficient USDC balance for contribution
                                </li>
                                <li>
                                  Small amount of XLM for transaction fees
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {walletConnection && (
                      <div className="space-y-4">
                        {/* Connection Info */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <p className="text-sm text-green-800 font-medium">
                                Wallet Connected
                              </p>
                            </div>
                            {isCheckingUSDC && (
                              <Loader2 className="h-4 w-4 text-green-600 animate-spin" />
                            )}
                          </div>
                          <p className="text-xs text-green-600 mt-1">
                            {walletConnection.publicKey.substring(0, 8)}...
                            {walletConnection.publicKey.substring(-8)}
                          </p>
                        </div>

                        {/* USDC Status */}
                        {hasUsdcTrustline !== null && (
                          <div
                            className={`rounded-lg p-3 border ${
                              hasUsdcTrustline
                                ? "bg-green-50 border-green-200"
                                : "bg-red-50 border-red-200"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    hasUsdcTrustline
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                                <p
                                  className={`text-sm font-medium ${
                                    hasUsdcTrustline
                                      ? "text-green-800"
                                      : "text-red-800"
                                  }`}
                                >
                                  USDC{" "}
                                  {hasUsdcTrustline
                                    ? "Ready"
                                    : "Trustline Required"}
                                </p>
                              </div>
                              {!hasUsdcTrustline && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={createUSDCTrustline}
                                  disabled={isCheckingUSDC}
                                >
                                  Setup USDC
                                </Button>
                              )}
                            </div>
                            {hasUsdcTrustline && usdcBalance !== null ? (
                              <p className="text-xs text-green-600 mt-1">
                                Balance: {formatCurrency(usdcBalance)} USDC
                              </p>
                            ) : !hasUsdcTrustline ? (
                              <p className="text-xs text-red-600 mt-1">
                                You need to establish a trustline to USDC before
                                contributing
                              </p>
                            ) : null}
                          </div>
                        )}

                        {/* Contribution Limits */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-800 font-medium mb-1">
                            Contribution Limits
                          </p>
                          <p className="text-xs text-blue-600">
                            Min:{" "}
                            {formatCurrency(
                              group.settings.min_contribution || 10
                            )}{" "}
                            • Max:{" "}
                            {formatCurrency(
                              group.settings.max_contribution || 1000
                            )}
                          </p>
                        </div>

                        <form onSubmit={handleContribute} className="space-y-4">
                          <div>
                            <Label htmlFor="amount">Amount (USDC)</Label>
                            <div className="relative">
                              <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                min={group.settings.min_contribution || 0.01}
                                max={group.settings.max_contribution || 10000}
                                placeholder={`Min: ${group.settings.min_contribution || 10}`}
                                value={contributionAmount}
                                onChange={(e) =>
                                  setContributionAmount(e.target.value)
                                }
                                className="pr-16"
                                disabled={!hasUsdcTrustline}
                                required
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-sm text-gray-500 font-medium">
                                  USDC
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-gray-500">
                                {hasUsdcTrustline
                                  ? `Available: ${usdcBalance !== null ? formatCurrency(usdcBalance) : "..."} USDC`
                                  : "USDC trustline required"}
                              </p>
                              {usdcBalance !== null && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
                                  onClick={checkUSDCStatus}
                                  disabled={isCheckingUSDC}
                                >
                                  Refresh
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Quick Amount Buttons - Only show if trustline exists */}
                          {hasUsdcTrustline && (
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                group.settings.min_contribution || 10,
                                Math.floor(
                                  ((group.settings.max_contribution || 1000) +
                                    (group.settings.min_contribution || 10)) /
                                    2
                                ),
                                group.settings.max_contribution || 1000,
                              ].map((amount) => (
                                <Button
                                  key={amount}
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setContributionAmount(amount.toString())
                                  }
                                  disabled={
                                    isContributing ||
                                    (usdcBalance !== null &&
                                      usdcBalance < amount)
                                  }
                                >
                                  {formatCurrency(amount)}
                                </Button>
                              ))}
                            </div>
                          )}

                          <Button
                            type="submit"
                            className="w-full"
                            disabled={
                              isContributing ||
                              !hasUsdcTrustline ||
                              !contributionAmount ||
                              parseFloat(contributionAmount) <= 0 ||
                              (usdcBalance !== null &&
                                usdcBalance < parseFloat(contributionAmount))
                            }
                          >
                            {isContributing ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Processing Stellar Transaction...
                              </>
                            ) : !hasUsdcTrustline ? (
                              <>
                                <Shield className="h-4 w-4 mr-2" />
                                Setup USDC First
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Contribute{" "}
                                {contributionAmount
                                  ? formatCurrency(
                                      parseFloat(contributionAmount)
                                    )
                                  : ""}{" "}
                                USDC
                              </>
                            )}
                          </Button>

                          {/* Help Text */}
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <p className="text-xs text-gray-600">
                              <strong>How it works:</strong> Your contribution
                              will be sent via Stellar network using USDC. The
                              transaction will be recorded on-chain and your
                              balance will be updated in the group.
                              {!hasUsdcTrustline && (
                                <span className="block mt-1 text-amber-600">
                                  <strong>Note:</strong> You must first
                                  establish a USDC trustline to contribute.
                                </span>
                              )}
                            </p>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "members" && (
            <Card>
              <CardHeader>
                <CardTitle>Group Members</CardTitle>
                <CardDescription>
                  {group.member_count} member
                  {group.member_count !== 1 ? "s" : ""} in this group
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.group_memberships.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {member.users.full_name || "Anonymous User"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Joined {formatDate(member.joined_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              member.role === "admin" ? "default" : "secondary"
                            }
                          >
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Balance: {formatCurrency(member.current_balance)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "transactions" && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest activity in this group</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <ArrowUpRight className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex flex-col space-y-3 p-4 border rounded-lg"
                      >
                        <div className="flex items-center justify-between">
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
                              <p className="font-medium">
                                {transaction.description || transaction.type}
                              </p>
                              <p className="text-sm text-gray-500">
                                {transaction.users.full_name ||
                                  "Anonymous User"}{" "}
                                • {formatDate(transaction.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-medium ${
                                transaction.type === "contribution"
                                  ? "text-green-600"
                                  : transaction.type === "withdrawal"
                                    ? "text-red-600"
                                    : "text-blue-600"
                              }`}
                            >
                              {transaction.type === "contribution"
                                ? "+"
                                : transaction.type === "withdrawal"
                                  ? "-"
                                  : "+"}
                              {formatCurrency(Math.abs(transaction.amount))}
                            </p>
                            <Badge
                              variant={
                                transaction.status === "confirmed"
                                  ? "default"
                                  : transaction.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Stellar Transaction Hash */}
                        {transaction.stellar_transaction_id && (
                          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border-t">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <div>
                                <p className="text-xs font-medium text-gray-700">
                                  Stellar Transaction
                                </p>
                                <code className="text-xs text-gray-600 font-mono">
                                  {truncateAddress(
                                    transaction.stellar_transaction_id
                                  )}
                                </code>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    transaction.stellar_transaction_id!
                                  );
                                  toast({
                                    title: "Copied!",
                                    description:
                                      "Transaction hash copied to clipboard",
                                  });
                                }}
                                title="Copy transaction hash"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  const explorerUrl = `https://stellar.expert/explorer/testnet/tx/${transaction.stellar_transaction_id}`;
                                  window.open(explorerUrl, "_blank");
                                }}
                                title="View on Stellar Explorer"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "yield" && (
            <BlendYieldDashboard groupId={groupId} isAdmin={isAdmin} />
          )}

          {activeTab === "invitations" && isAdmin && (
            <div className="space-y-8">
              <CreateInvitation
                groupId={groupId}
                groupName={group.name}
                onInvitationCreated={refetchInvitations}
              />
              <InvitationList
                invitations={invitations}
                isLoading={invitationsLoading}
              />
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
}
