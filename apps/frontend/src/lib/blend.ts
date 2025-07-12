import { StellarService, WalletConnection } from './stellar';
import { ContractService } from './contract';

export interface BlendPoolInfo {
  poolId: string;
  name: string;
  totalSupplied: number;
  apy: number;
  supportedAssets: string[];
  isActive: boolean;
}

export interface YieldInfo {
  totalYield: number;
  dailyYield: number;
  weeklyYield: number;
  monthlyYield: number;
  apy: number;
  lastDistribution: string;
}

export interface GroupYieldData {
  groupId: string;
  totalInvested: number;
  currentYield: number;
  projectedYield: number;
  yieldHistory: YieldHistoryEntry[];
  isAutoInvestEnabled: boolean;
  blendPoolId?: string;
}

export interface YieldHistoryEntry {
  date: string;
  amount: number;
  type: 'yield_earned' | 'yield_distributed';
  transactionId?: string;
}

export class BlendService {
  private static readonly BLEND_POOL_CONTRACT = process.env.NEXT_PUBLIC_BLEND_POOL_CONTRACT || '';
  private static readonly COMMUNITY_WALLET_CONTRACT = process.env.NEXT_PUBLIC_COMMUNITY_WALLET_CONTRACT || '';
  private static contractService = new ContractService();

  /**
   * Get available Blend pools for investment
   */
  static async getAvailablePools(): Promise<BlendPoolInfo[]> {
    try {
      // Mock data for now - replace with actual Blend Protocol API calls
      return [
        {
          poolId: 'blend_usdc_pool_1',
          name: 'USDC Lending Pool',
          totalSupplied: 2500000,
          apy: 8.5,
          supportedAssets: ['USDC'],
          isActive: true,
        },
        {
          poolId: 'blend_xlm_pool_1', 
          name: 'XLM Lending Pool',
          totalSupplied: 1800000,
          apy: 6.2,
          supportedAssets: ['XLM'],
          isActive: true,
        },
      ];
    } catch (error) {
      console.error('Error fetching Blend pools:', error);
      throw new Error('Failed to fetch available pools');
    }
  }

  /**
   * Get current yield information for a group
   */
  static async getGroupYieldInfo(groupId: string): Promise<GroupYieldData> {
    try {
      // Get group data from smart contract
      const group = await this.contractService.getGroup(groupId);
      const groupYield = await this.contractService.getGroupYield(groupId);
      const isAutoInvestEnabled = await this.contractService.isAutoInvestEnabled(groupId);
      const blendPoolAddress = await this.contractService.getBlendPool();

      // Mock yield history for now - in production this would come from indexing contract events
      const mockYieldHistory: YieldHistoryEntry[] = [
        {
          date: new Date(Date.now() - 86400000 * 7).toISOString(),
          amount: 12.45,
          type: 'yield_earned',
        },
        {
          date: new Date(Date.now() - 86400000 * 3).toISOString(),
          amount: 8.32,
          type: 'yield_earned',
        },
        {
          date: new Date().toISOString(),
          amount: 15.67,
          type: 'yield_distributed',
          transactionId: 'abc123...def456',
        },
      ];

      const currentYieldAmount = ContractService.fromContractAmount(groupYield);
      const totalInvested = group ? ContractService.fromContractAmount(group.total_balance) : 0;

      return {
        groupId,
        totalInvested,
        currentYield: currentYieldAmount,
        projectedYield: currentYieldAmount * 1.5, // Estimate based on current yield
        yieldHistory: mockYieldHistory,
        isAutoInvestEnabled,
        blendPoolId: blendPoolAddress ? 'blend_usdc_pool_1' : undefined,
      };
    } catch (error) {
      console.error('Error fetching group yield info:', error);
      throw new Error('Failed to fetch yield information');
    }
  }

  /**
   * Enable auto-invest for a group
   */
  static async enableAutoInvest(
    groupId: string,
    blendPoolId: string,
    walletConnection: WalletConnection
  ): Promise<string> {
    try {
      if (!walletConnection.isConnected) {
        throw new Error('Wallet not connected');
      }

      const walletKit = await this.contractService.getWalletConnection();
      const publicKey = await walletKit.getPublicKey();
      
      // Set Blend pool address for auto-invest
      const txHash = await this.contractService.setBlendPool(
        publicKey.publicKey,
        blendPoolId,
        walletKit
      );

      console.log('Enabled auto-invest for group:', groupId, 'tx:', txHash);
      return txHash;
    } catch (error) {
      console.error('Error enabling auto-invest:', error);
      throw new Error('Failed to enable auto-invest');
    }
  }

  /**
   * Disable auto-invest for a group
   */
  static async disableAutoInvest(
    groupId: string,
    walletConnection: WalletConnection
  ): Promise<string> {
    try {
      if (!walletConnection.isConnected) {
        throw new Error('Wallet not connected');
      }

      const walletKit = await this.contractService.getWalletConnection();
      const publicKey = await walletKit.getPublicKey();
      
      // Clear Blend pool address to disable auto-invest (set to empty string)
      const txHash = await this.contractService.setBlendPool(
        publicKey.publicKey,
        '',
        walletKit
      );

      console.log('Disabled auto-invest for group:', groupId, 'tx:', txHash);
      return txHash;
    } catch (error) {
      console.error('Error disabling auto-invest:', error);
      throw new Error('Failed to disable auto-invest');
    }
  }

  /**
   * Manually deposit group funds to Blend for yield generation
   */
  static async depositToBlend(
    groupId: string,
    amount: number,
    walletConnection: WalletConnection
  ): Promise<string> {
    try {
      if (!walletConnection.isConnected) {
        throw new Error('Wallet not connected');
      }

      if (amount <= 0) {
        throw new Error('Invalid deposit amount');
      }

      const walletKit = await this.contractService.getWalletConnection();
      const contractAmount = ContractService.toContractAmount(amount);
      
      // Use USDC token address (this would be configured)
      const tokenAddress = 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA'; // Mock USDC address

      const txHash = await this.contractService.depositToBlend(
        {
          groupId,
          amount: contractAmount,
          tokenAddress,
        },
        walletKit
      );

      console.log('Deposited to Blend:', { groupId, amount, txHash });
      return txHash;
    } catch (error) {
      console.error('Error depositing to Blend:', error);
      throw new Error('Failed to deposit to Blend protocol');
    }
  }

  /**
   * Withdraw funds from Blend with accumulated yield
   */
  static async withdrawFromBlend(
    groupId: string,
    amount: number,
    walletConnection: WalletConnection
  ): Promise<string> {
    try {
      if (!walletConnection.isConnected) {
        throw new Error('Wallet not connected');
      }

      if (amount <= 0) {
        throw new Error('Invalid withdrawal amount');
      }

      const walletKit = await this.contractService.getWalletConnection();
      const publicKey = await walletKit.getPublicKey();
      const contractAmount = ContractService.toContractAmount(amount);
      
      // Use USDC token address (this would be configured)
      const tokenAddress = 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA'; // Mock USDC address

      const txHash = await this.contractService.withdrawFromBlend(
        publicKey.publicKey,
        {
          groupId,
          amount: contractAmount,
          tokenAddress,
        },
        walletKit
      );

      console.log('Withdrew from Blend:', { groupId, amount, txHash });
      return txHash;
    } catch (error) {
      console.error('Error withdrawing from Blend:', error);
      throw new Error('Failed to withdraw from Blend protocol');
    }
  }

  /**
   * Distribute accumulated yield to group members
   */
  static async distributeYield(
    groupId: string,
    walletConnection: WalletConnection
  ): Promise<string> {
    try {
      if (!walletConnection.isConnected) {
        throw new Error('Wallet not connected');
      }

      const walletKit = await this.contractService.getWalletConnection();
      
      const txHash = await this.contractService.distributeYield(groupId, walletKit);

      console.log('Distributed yield for group:', groupId, 'tx:', txHash);
      return txHash;
    } catch (error) {
      console.error('Error distributing yield:', error);
      throw new Error('Failed to distribute yield');
    }
  }

  /**
   * Calculate projected yield based on current investment and APY
   */
  static calculateProjectedYield(
    principal: number,
    apy: number,
    daysInvestment: number
  ): number {
    const dailyRate = apy / 365 / 100;
    return principal * dailyRate * daysInvestment;
  }

  /**
   * Format yield amount for display
   */
  static formatYieldAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(amount);
  }

  /**
   * Format APY percentage for display
   */
  static formatAPY(apy: number): string {
    return `${apy.toFixed(2)}%`;
  }

  /**
   * Get yield performance metrics
   */
  static async getYieldMetrics(groupId: string): Promise<YieldInfo> {
    try {
      const groupYield = await this.getGroupYieldInfo(groupId);
      
      // Calculate metrics based on yield history
      const totalYield = groupYield.currentYield;
      const recentYields = groupYield.yieldHistory
        .filter(entry => entry.type === 'yield_earned')
        .slice(-30); // Last 30 entries
      
      const dailyAverage = recentYields.length > 0 
        ? recentYields.reduce((sum, entry) => sum + entry.amount, 0) / recentYields.length
        : 0;

      return {
        totalYield,
        dailyYield: dailyAverage,
        weeklyYield: dailyAverage * 7,
        monthlyYield: dailyAverage * 30,
        apy: 8.5, // This would come from the Blend pool
        lastDistribution: groupYield.yieldHistory
          .filter(entry => entry.type === 'yield_distributed')
          .pop()?.date || '',
      };
    } catch (error) {
      console.error('Error getting yield metrics:', error);
      throw new Error('Failed to fetch yield metrics');
    }
  }
}