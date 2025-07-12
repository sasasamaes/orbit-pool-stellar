'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { WalletConnection } from '@/lib/stellar';
import { GroupYieldData, BlendService } from '@/lib/blend';
import { formatCurrency } from '@/lib/utils';
import { 
  Send, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  TrendingUp,
  Loader2,
  AlertCircle,
  Info
} from 'lucide-react';

interface YieldActionsProps {
  groupId: string;
  groupYieldData?: GroupYieldData;
  walletConnection: WalletConnection | null;
  isUserAdmin?: boolean;
  isProcessing?: boolean;
  onDepositToBlend: (amount: number) => Promise<void>;
  onWithdrawFromBlend: (amount: number) => Promise<void>;
  onDistributeYield: () => Promise<void>;
}

export function YieldActions({
  groupId,
  groupYieldData,
  walletConnection,
  isUserAdmin = false,
  isProcessing = false,
  onDepositToBlend,
  onWithdrawFromBlend,
  onDistributeYield,
}: YieldActionsProps) {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);

  const isWalletConnected = walletConnection?.isConnected || false;
  const currentYield = groupYieldData?.currentYield || 0;
  const totalInvested = groupYieldData?.totalInvested || 0;
  const isAutoInvestEnabled = groupYieldData?.isAutoInvestEnabled || false;

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    
    if (amount <= 0) return;
    
    setIsDepositing(true);
    try {
      await onDepositToBlend(amount);
      setDepositAmount('');
    } finally {
      setIsDepositing(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    
    if (amount <= 0) return;
    
    setIsWithdrawing(true);
    try {
      await onWithdrawFromBlend(amount);
      setWithdrawAmount('');
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleDistribute = async () => {
    setIsDistributing(true);
    try {
      await onDistributeYield();
    } finally {
      setIsDistributing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Yield Management</span>
        </CardTitle>
        <CardDescription>
          Manage yield investments and distributions for the group
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Current Yield</p>
            <p className="text-lg font-semibold text-green-600">
              {formatCurrency(currentYield)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Invested</p>
            <p className="text-lg font-semibold">
              {formatCurrency(totalInvested)}
            </p>
          </div>
        </div>

        {/* Auto-invest status info */}
        <div className="flex items-start space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-blue-900 font-medium">
              Auto-Invest {isAutoInvestEnabled ? 'Enabled' : 'Disabled'}
            </p>
            <p className="text-blue-700">
              {isAutoInvestEnabled 
                ? 'New contributions are automatically invested for yield'
                : 'Manual investment required for yield generation'
              }
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {/* Distribute Yield */}
          {currentYield > 0 && isUserAdmin && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Distribute Accumulated Yield</h4>
                <Badge variant="default">
                  {formatCurrency(currentYield)} available
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Distribute the accumulated yield proportionally to all group members based on their contributions.
              </p>
              <Button 
                onClick={handleDistribute}
                disabled={!isWalletConnected || isProcessing || isDistributing}
                className="w-full"
              >
                {isDistributing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Distributing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Distribute {formatCurrency(currentYield)}
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Manual Investment Actions (only if auto-invest is disabled) */}
          {!isAutoInvestEnabled && isUserAdmin && (
            <>
              <Separator />
              
              {/* Manual Deposit */}
              <div className="space-y-3">
                <h4 className="font-medium">Manual Investment</h4>
                <p className="text-sm text-muted-foreground">
                  Manually deposit group funds to Blend Protocol for yield generation.
                </p>
                <form onSubmit={handleDeposit} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount">Deposit Amount (USDC)</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      disabled={isProcessing || isDepositing}
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={!depositAmount || !isWalletConnected || isProcessing || isDepositing}
                    className="w-full"
                  >
                    {isDepositing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Depositing...
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Deposit to Blend
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Manual Withdrawal */}
              {totalInvested > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Manual Withdrawal</h4>
                  <p className="text-sm text-muted-foreground">
                    Withdraw invested funds from Blend Protocol with accumulated yield.
                  </p>
                  <form onSubmit={handleWithdraw} className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount">Withdrawal Amount (USDC)</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        min="0"
                        max={totalInvested}
                        step="0.01"
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        disabled={isProcessing || isWithdrawing}
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum: {formatCurrency(totalInvested)} (currently invested)
                      </p>
                    </div>
                    <Button 
                      type="submit"
                      variant="outline"
                      disabled={!withdrawAmount || !isWalletConnected || isProcessing || isWithdrawing}
                      className="w-full"
                    >
                      {isWithdrawing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Withdrawing...
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="mr-2 h-4 w-4" />
                          Withdraw from Blend
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>

        {/* Permissions and Warnings */}
        <div className="space-y-3">
          {!isWalletConnected && (
            <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <Wallet className="h-4 w-4 text-orange-600" />
              <p className="text-sm text-orange-700">
                Connect your wallet to perform yield management actions
              </p>
            </div>
          )}

          {!isUserAdmin && (
            <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-700">
                Only group administrators can manage yield investments and distributions
              </p>
            </div>
          )}

          {currentYield === 0 && (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <Info className="h-4 w-4 text-gray-600" />
              <p className="text-sm text-gray-700">
                No yield available for distribution. Enable auto-invest or manually deposit funds to start earning.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}