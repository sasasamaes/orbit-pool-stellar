"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateInviteCode, formatCurrency } from "@/lib/utils";
import { ApiClient } from "@/lib/api";
import { AuthDebug } from "@/components/auth-debug";
import { WalletConnection } from "@/lib/stellar";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Settings,
  DollarSign,
  Shield,
  TrendingUp,
  Loader2,
  Wallet,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface GroupSettings {
  minContribution: number;
  maxContribution: number;
  contributionFrequency: string;
  withdrawalRequiresApproval: boolean;
  maxMembers: number;
  autoInvestEnabled: boolean;
}

export default function CreateGroupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Form data
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [settings, setSettings] = useState<GroupSettings>({
    minContribution: 10,
    maxContribution: 1000,
    contributionFrequency: "monthly",
    withdrawalRequiresApproval: true,
    maxMembers: 10,
    autoInvestEnabled: true,
  });

  // Wallet and payment state
  const [walletConnection, setWalletConnection] =
    useState<WalletConnection | null>(null);
  const [stellarTransactionId, setStellarTransactionId] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [hasUsdcTrustline, setHasUsdcTrustline] = useState<boolean | null>(
    null
  );
  const [isCheckingUSDC, setIsCheckingUSDC] = useState(false);

  const INITIAL_CONTRIBUTION_AMOUNT = 10; // $10 USDC required

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

  const makeInitialContribution = async () => {
    if (!walletConnection) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!hasUsdcTrustline) {
      toast({
        title: "Error",
        description:
          "USDC trustline required. Please set up USDC in your wallet first.",
        variant: "destructive",
      });
      return;
    }

    if (usdcBalance === null || usdcBalance < INITIAL_CONTRIBUTION_AMOUNT) {
      toast({
        title: "Insufficient Balance",
        description: `You need at least ${formatCurrency(INITIAL_CONTRIBUTION_AMOUNT)} USDC to create a group.`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);
    try {
      console.log("🚀 Making initial contribution of $10 USDC...");

      // Create a temporary group account to receive the initial payment
      const { StellarService, USDC_ASSET } = await import("@/lib/stellar");

      // Use a valid testnet address that can receive payments
      // The backend will handle transferring these funds to the actual group account
      const tempGroupAddress =
        "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"; // USDC issuer on testnet

      // Build the payment transaction
      const transaction = await StellarService.buildTransaction(
        walletConnection.publicKey,
        [
          StellarService.createPaymentOperation(
            tempGroupAddress,
            INITIAL_CONTRIBUTION_AMOUNT.toString(),
            USDC_ASSET
          ),
        ],
        "Group creation"
      );

      // Sign transaction using the wallet
      const { ContractService } = await import("@/lib/contract");
      const contractService = new ContractService();
      const walletKit = await contractService.getWalletConnection();

      console.log("🔐 Signing transaction with wallet...");

      const transactionXDR = transaction.toXDR();
      if (!transactionXDR) {
        throw new Error("Failed to generate transaction XDR");
      }

      // Sign the transaction
      const signedTx = await walletKit.signTransaction(transactionXDR, {
        networkPassphrase: "Test SDF Network ; September 2015",
        address: walletConnection.publicKey,
      });

      if (!signedTx || !signedTx.signedTxXdr) {
        throw new Error("Wallet failed to sign transaction");
      }

      console.log("📤 Submitting transaction to Stellar network...");

      // Submit the transaction
      const result = await StellarService.submitTransaction(
        signedTx.signedTxXdr
      );

      console.log("✅ Initial contribution successful:", result.hash);

      setStellarTransactionId(result.hash);
      setPaymentCompleted(true);

      toast({
        title: "Payment Successful! 🎉",
        description: `Initial contribution of ${formatCurrency(INITIAL_CONTRIBUTION_AMOUNT)} USDC completed.`,
      });
    } catch (error: any) {
      console.error("❌ Error making initial contribution:", error);

      let errorMessage =
        "Failed to process initial contribution. Please try again.";
      if (error.message?.includes("User declined")) {
        errorMessage = "Transaction was cancelled by user";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient USDC balance or XLM for transaction fees";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Payment Failed ❌",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stellarTransactionId) {
      toast({
        title: "Error",
        description: "Initial contribution is required to create a group.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Prepare group data for API call
      const groupData = {
        name: groupName.trim(),
        description: description.trim() || undefined,
        settings: {
          min_contribution: settings.minContribution,
          max_contribution: settings.maxContribution,
          contribution_frequency: settings.contributionFrequency,
          withdrawal_requires_approval: settings.withdrawalRequiresApproval,
          max_members: settings.maxMembers,
          auto_invest_enabled: settings.autoInvestEnabled,
        },
        initial_contribution_amount: INITIAL_CONTRIBUTION_AMOUNT,
        stellar_transaction_id: stellarTransactionId,
      };

      console.log("Creating group with initial contribution:", groupData);

      // Make API call to create group
      const createdGroup = (await ApiClient.createGroup(groupData)) as {
        id: string;
        message?: string;
      };

      toast({
        title: "Group Created! 🎉",
        description: `${groupName} has been created with initial investment in Blend.`,
      });

      // Redirect to the created group page
      router.push(`/groups/${createdGroup.id}`);
    } catch (error: any) {
      console.error("Error creating group:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create group.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && !groupName.trim()) {
      toast({
        title: "Validation Error",
        description: "Group name is required.",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
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

            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </header>

        <div className="container py-8">
          <div className="max-w-2xl mx-auto">
            {/* Debug Component - Remove in production */}
            <div className="mb-8">
              <AuthDebug />
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step >= 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`}
                />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step >= 2
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  2
                </div>
                <div
                  className={`w-16 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`}
                />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step >= 3
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  3
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateGroup}>
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Group Information</span>
                    </CardTitle>
                    <CardDescription>
                      Tell us about your savings group
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="groupName">Group Name *</Label>
                      <Input
                        id="groupName"
                        placeholder="e.g., Family Vacation Fund"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        Choose a clear name that describes your savings goal
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the purpose of this savings group..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                      />
                      <p className="text-sm text-muted-foreground">
                        Help members understand what you're saving for
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={handleNext}>
                        Next: Configure Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Group Settings</span>
                    </CardTitle>
                    <CardDescription>
                      Configure how your group will operate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contribution Limits */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Contribution Limits</span>
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="minContribution">Minimum ($)</Label>
                          <Input
                            id="minContribution"
                            type="number"
                            min="1"
                            value={settings.minContribution}
                            onChange={(e) =>
                              setSettings((prev) => ({
                                ...prev,
                                minContribution: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxContribution">Maximum ($)</Label>
                          <Input
                            id="maxContribution"
                            type="number"
                            min="1"
                            value={settings.maxContribution}
                            onChange={(e) =>
                              setSettings((prev) => ({
                                ...prev,
                                maxContribution: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Group Size */}
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Group Size</span>
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="maxMembers">Maximum Members</Label>
                        <Input
                          id="maxMembers"
                          type="number"
                          min="2"
                          max="100"
                          value={settings.maxMembers}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              maxMembers: Number(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Security & Governance</span>
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Withdrawal Approval</Label>
                          <p className="text-sm text-muted-foreground">
                            Require admin approval for withdrawals
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.withdrawalRequiresApproval}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              withdrawalRequiresApproval: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Investment Settings */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Investment Options</span>
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Auto-Invest via Blend Protocol</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically earn yield on group funds daily at 12
                            PM
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.autoInvestEnabled}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              autoInvestEnabled: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button type="button" onClick={handleNext}>
                        Next: Initial Contribution
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Initial Contribution</span>
                    </CardTitle>
                    <CardDescription>
                      Every new group requires a{" "}
                      {formatCurrency(INITIAL_CONTRIBUTION_AMOUNT)} USDC initial
                      contribution that will be automatically invested in Blend
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Initial Contribution Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-800 font-medium mb-2">
                            Initial Investment Required
                          </p>
                          <p className="text-xs text-blue-700 mb-3">
                            To create a group, you must make an initial
                            contribution of{" "}
                            {formatCurrency(INITIAL_CONTRIBUTION_AMOUNT)} USDC.
                            This amount will be automatically invested in Blend
                            Protocol to start earning yield immediately.
                          </p>
                          <div className="text-xs text-blue-700 space-y-1">
                            <p>
                              <strong>Benefits:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                              <li>
                                Your funds start earning yield from day one
                              </li>
                              <li>Automatic daily investment at 12 PM</li>
                              <li>Full transparency with Stellar blockchain</li>
                              <li>You remain the admin of your group</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wallet Connection */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <Wallet className="h-4 w-4" />
                        <span>Connect Wallet & Pay</span>
                      </h3>

                      <ConnectWallet
                        onConnection={setWalletConnection}
                        showBalance={true}
                      />

                      {!walletConnection && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="text-sm text-yellow-800 font-medium mb-2">
                                Stellar Wallet Required
                              </p>
                              <p className="text-xs text-yellow-700">
                                To create a group and make the initial
                                contribution, you need a Stellar wallet with
                                USDC.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {walletConnection && (
                        <div className="space-y-4">
                          {/* Connection Status */}
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
                              </div>
                              {hasUsdcTrustline && usdcBalance !== null ? (
                                <p className="text-xs text-green-600 mt-1">
                                  Balance: {formatCurrency(usdcBalance)} USDC
                                </p>
                              ) : !hasUsdcTrustline ? (
                                <p className="text-xs text-red-600 mt-1">
                                  You need to establish a USDC trustline before
                                  creating a group
                                </p>
                              ) : null}
                            </div>
                          )}

                          {/* Payment Status */}
                          {paymentCompleted ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                  <p className="text-sm text-green-800 font-medium">
                                    Payment Completed Successfully!
                                  </p>
                                  <p className="text-xs text-green-600 mt-1">
                                    Transaction ID:{" "}
                                    {stellarTransactionId.substring(0, 16)}...
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {/* Payment Amount */}
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div className="text-center">
                                  <p className="text-sm text-gray-600 mb-2">
                                    Initial Contribution Required
                                  </p>
                                  <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(
                                      INITIAL_CONTRIBUTION_AMOUNT
                                    )}{" "}
                                    USDC
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    This will be automatically invested in Blend
                                    Protocol
                                  </p>
                                </div>
                              </div>

                              {/* Pay Button */}
                              <Button
                                type="button"
                                onClick={makeInitialContribution}
                                className="w-full"
                                size="lg"
                                disabled={
                                  isProcessingPayment ||
                                  !hasUsdcTrustline ||
                                  (usdcBalance !== null &&
                                    usdcBalance < INITIAL_CONTRIBUTION_AMOUNT)
                                }
                              >
                                {isProcessingPayment ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Processing Payment...
                                  </>
                                ) : !hasUsdcTrustline ? (
                                  <>
                                    <Shield className="h-4 w-4 mr-2" />
                                    Setup USDC Trustline First
                                  </>
                                ) : usdcBalance !== null &&
                                  usdcBalance < INITIAL_CONTRIBUTION_AMOUNT ? (
                                  <>
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Insufficient USDC Balance
                                  </>
                                ) : (
                                  <>
                                    <Send className="h-4 w-4 mr-2" />
                                    Pay{" "}
                                    {formatCurrency(
                                      INITIAL_CONTRIBUTION_AMOUNT
                                    )}{" "}
                                    USDC
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={isProcessingPayment}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading || !paymentCompleted}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Group...
                          </>
                        ) : !paymentCompleted ? (
                          "Complete Payment First"
                        ) : (
                          "Create Group"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
