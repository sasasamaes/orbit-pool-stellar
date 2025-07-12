import { useState, useEffect, useCallback } from 'react';
import { BlendService, GroupYieldData, YieldInfo, BlendPoolInfo } from '@/lib/blend';
import { WalletConnection } from '@/lib/stellar';
import { useToast } from './use-toast';

export interface UseYieldReturn {
  // State
  groupYieldData: GroupYieldData | null;
  yieldMetrics: YieldInfo | null;
  availablePools: BlendPoolInfo[];
  isLoading: boolean;
  isProcessing: boolean;
  error: string | null;

  // Actions
  loadYieldData: (groupId: string) => Promise<void>;
  enableAutoInvest: (groupId: string, poolId: string, wallet: WalletConnection) => Promise<void>;
  disableAutoInvest: (groupId: string, wallet: WalletConnection) => Promise<void>;
  depositToBlend: (groupId: string, amount: number, wallet: WalletConnection) => Promise<void>;
  withdrawFromBlend: (groupId: string, amount: number, wallet: WalletConnection) => Promise<void>;
  distributeYield: (groupId: string, wallet: WalletConnection) => Promise<void>;
  refreshData: () => Promise<void>;
}

export function useYield(groupId?: string): UseYieldReturn {
  const [groupYieldData, setGroupYieldData] = useState<GroupYieldData | null>(null);
  const [yieldMetrics, setYieldMetrics] = useState<YieldInfo | null>(null);
  const [availablePools, setAvailablePools] = useState<BlendPoolInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadYieldData = useCallback(async (targetGroupId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [yieldData, metrics, pools] = await Promise.all([
        BlendService.getGroupYieldInfo(targetGroupId),
        BlendService.getYieldMetrics(targetGroupId),
        BlendService.getAvailablePools(),
      ]);

      setGroupYieldData(yieldData);
      setYieldMetrics(metrics);
      setAvailablePools(pools);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load yield data';
      setError(errorMessage);
      toast({
        title: 'Error Loading Yield Data',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const enableAutoInvest = useCallback(async (
    targetGroupId: string,
    poolId: string,
    wallet: WalletConnection
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      const txHash = await BlendService.enableAutoInvest(targetGroupId, poolId, wallet);
      
      toast({
        title: 'Auto-Invest Enabled',
        description: 'Group funds will now automatically earn yield via Blend Protocol.',
      });

      // Refresh data after successful transaction
      await loadYieldData(targetGroupId);
      
      return txHash;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to enable auto-invest';
      setError(errorMessage);
      toast({
        title: 'Auto-Invest Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [loadYieldData, toast]);

  const disableAutoInvest = useCallback(async (
    targetGroupId: string,
    wallet: WalletConnection
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      const txHash = await BlendService.disableAutoInvest(targetGroupId, wallet);
      
      toast({
        title: 'Auto-Invest Disabled',
        description: 'Automatic yield generation has been turned off for this group.',
      });

      // Refresh data after successful transaction
      await loadYieldData(targetGroupId);
      
      return txHash;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to disable auto-invest';
      setError(errorMessage);
      toast({
        title: 'Operation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [loadYieldData, toast]);

  const depositToBlend = useCallback(async (
    targetGroupId: string,
    amount: number,
    wallet: WalletConnection
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      const txHash = await BlendService.depositToBlend(targetGroupId, amount, wallet);
      
      toast({
        title: 'Deposit Successful',
        description: `${BlendService.formatYieldAmount(amount)} deposited to Blend for yield generation.`,
      });

      // Refresh data after successful transaction
      await loadYieldData(targetGroupId);
      
      return txHash;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to deposit to Blend';
      setError(errorMessage);
      toast({
        title: 'Deposit Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [loadYieldData, toast]);

  const withdrawFromBlend = useCallback(async (
    targetGroupId: string,
    amount: number,
    wallet: WalletConnection
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      const txHash = await BlendService.withdrawFromBlend(targetGroupId, amount, wallet);
      
      toast({
        title: 'Withdrawal Successful',
        description: `${BlendService.formatYieldAmount(amount)} withdrawn from Blend with yield.`,
      });

      // Refresh data after successful transaction
      await loadYieldData(targetGroupId);
      
      return txHash;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to withdraw from Blend';
      setError(errorMessage);
      toast({
        title: 'Withdrawal Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [loadYieldData, toast]);

  const distributeYield = useCallback(async (
    targetGroupId: string,
    wallet: WalletConnection
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      const txHash = await BlendService.distributeYield(targetGroupId, wallet);
      
      toast({
        title: 'Yield Distributed',
        description: 'Accumulated yield has been distributed to all group members.',
      });

      // Refresh data after successful transaction
      await loadYieldData(targetGroupId);
      
      return txHash;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to distribute yield';
      setError(errorMessage);
      toast({
        title: 'Distribution Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [loadYieldData, toast]);

  const refreshData = useCallback(async () => {
    if (groupId) {
      await loadYieldData(groupId);
    }
  }, [groupId, loadYieldData]);

  // Auto-load data when groupId changes
  useEffect(() => {
    if (groupId) {
      loadYieldData(groupId);
    }
  }, [groupId, loadYieldData]);

  // Set up periodic refresh for yield data (every 30 seconds)
  useEffect(() => {
    if (!groupId) return;

    const interval = setInterval(() => {
      // Only refresh if not currently loading or processing
      if (!isLoading && !isProcessing) {
        refreshData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [groupId, isLoading, isProcessing, refreshData]);

  return {
    // State
    groupYieldData,
    yieldMetrics,
    availablePools,
    isLoading,
    isProcessing,
    error,

    // Actions
    loadYieldData,
    enableAutoInvest,
    disableAutoInvest,
    depositToBlend,
    withdrawFromBlend,
    distributeYield,
    refreshData,
  };
}