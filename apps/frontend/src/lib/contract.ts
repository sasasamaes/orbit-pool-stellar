import { 
  Client as CommunityWalletClient, 
  networks,
  Group as ContractGroup,
  Member as ContractMember
} from '../../../../packages/contracts/bindings/community_wallet';
import { 
  StellarWalletsKit, 
  WalletNetwork, 
  allowAllModules,
  FREIGHTER_ID 
} from '@creit.tech/stellar-wallets-kit';
import { 
  Keypair, 
  Networks, 
  SorobanRpc, 
  TransactionBuilder, 
  BASE_FEE,
  Account
} from '@stellar/stellar-sdk';

// Network configuration
const NETWORK = 'testnet';
const RPC_URL = 'https://soroban-testnet.stellar.org:443';
const NETWORK_PASSPHRASE = Networks.TESTNET;

// Contract configuration
const CONTRACT_ID = networks.testnet.contractId;

export interface ContractClientConfig {
  rpcUrl?: string;
  networkPassphrase?: string;
  contractId?: string;
}

export interface ContractGroup {
  id: string;
  name: string;
  creator: string;
  members: string[];
  total_balance: bigint;
  total_yield: bigint;
  blend_pool_address?: string;
  auto_invest_enabled: boolean;
  is_active: boolean;
}

export interface ContractMember {
  address: string;
  balance: bigint;
  is_admin: boolean;
  joined_at: bigint;
}

export interface CreateGroupParams {
  creator: string;
  groupId: string;
  name: string;
  autoInvestEnabled: boolean;
}

export interface ContributeParams {
  contributor: string;
  groupId: string;
  amount: bigint;
  tokenAddress: string;
}

export interface WithdrawParams {
  member: string;
  groupId: string;
  amount: bigint;
  tokenAddress: string;
}

export interface BlendOperationParams {
  groupId: string;
  amount: bigint;
  tokenAddress: string;
}

export class ContractService {
  private client: CommunityWalletClient;
  private rpc: SorobanRpc.Server;
  private networkPassphrase: string;
  private contractId: string;

  constructor(config: ContractClientConfig = {}) {
    this.rpc = new SorobanRpc.Server(config.rpcUrl || RPC_URL);
    this.networkPassphrase = config.networkPassphrase || NETWORK_PASSPHRASE;
    this.contractId = config.contractId || CONTRACT_ID;

    this.client = new CommunityWalletClient({
      rpcUrl: config.rpcUrl || RPC_URL,
      networkPassphrase: this.networkPassphrase,
      contractId: this.contractId,
    });
  }

  /**
   * Get wallet connection
   */
  async getWalletConnection(): Promise<StellarWalletsKit> {
    const kit = new StellarWalletsKit({
      network: NETWORK as WalletNetwork,
      selectedWalletId: FREIGHTER_ID,
      modules: allowAllModules(),
    });

    return kit;
  }

  /**
   * Create a new group
   */
  async createGroup(params: CreateGroupParams, walletKit: StellarWalletsKit): Promise<string> {
    try {
      const { publicKey } = await walletKit.getPublicKey();
      
      const tx = await this.client.create_group({
        creator: params.creator,
        group_id: params.groupId,
        name: params.name,
        auto_invest_enabled: params.autoInvestEnabled,
      });

      const signedTx = await walletKit.signTransaction(tx.toXDR(), {
        address: publicKey,
        networkPassphrase: this.networkPassphrase,
      });

      const result = await this.rpc.sendTransaction(signedTx);
      
      if (result.status === 'ERROR') {
        throw new Error(result.errorResult?.toXDR() || 'Transaction failed');
      }

      return result.hash;
    } catch (error) {
      console.error('Error creating group:', error);
      throw new Error('Failed to create group on blockchain');
    }
  }

  /**
   * Join an existing group
   */
  async joinGroup(member: string, groupId: string, walletKit: StellarWalletsKit): Promise<string> {
    try {
      const { publicKey } = await walletKit.getPublicKey();
      
      const tx = await this.client.join_group({
        member,
        group_id: groupId,
      });

      const signedTx = await walletKit.signTransaction(tx.toXDR(), {
        address: publicKey,
        networkPassphrase: this.networkPassphrase,
      });

      const result = await this.rpc.sendTransaction(signedTx);
      
      if (result.status === 'ERROR') {
        throw new Error(result.errorResult?.toXDR() || 'Transaction failed');
      }

      return result.hash;
    } catch (error) {
      console.error('Error joining group:', error);
      throw new Error('Failed to join group on blockchain');
    }
  }

  /**
   * Contribute funds to a group
   */
  async contribute(params: ContributeParams, walletKit: StellarWalletsKit): Promise<string> {
    try {
      const { publicKey } = await walletKit.getPublicKey();
      
      const tx = await this.client.contribute({
        contributor: params.contributor,
        group_id: params.groupId,
        amount: params.amount,
        token_address: params.tokenAddress,
      });

      const signedTx = await walletKit.signTransaction(tx.toXDR(), {
        address: publicKey,
        networkPassphrase: this.networkPassphrase,
      });

      const result = await this.rpc.sendTransaction(signedTx);
      
      if (result.status === 'ERROR') {
        throw new Error(result.errorResult?.toXDR() || 'Transaction failed');
      }

      return result.hash;
    } catch (error) {
      console.error('Error contributing to group:', error);
      throw new Error('Failed to contribute to group on blockchain');
    }
  }

  /**
   * Withdraw funds from a group
   */
  async withdraw(params: WithdrawParams, walletKit: StellarWalletsKit): Promise<string> {
    try {
      const { publicKey } = await walletKit.getPublicKey();
      
      const tx = await this.client.withdraw({
        member: params.member,
        group_id: params.groupId,
        amount: params.amount,
        token_address: params.tokenAddress,
      });

      const signedTx = await walletKit.signTransaction(tx.toXDR(), {
        address: publicKey,
        networkPassphrase: this.networkPassphrase,
      });

      const result = await this.rpc.sendTransaction(signedTx);
      
      if (result.status === 'ERROR') {
        throw new Error(result.errorResult?.toXDR() || 'Transaction failed');
      }

      return result.hash;
    } catch (error) {
      console.error('Error withdrawing from group:', error);
      throw new Error('Failed to withdraw from group on blockchain');
    }
  }

  /**
   * Get group information
   */
  async getGroup(groupId: string): Promise<ContractGroup | null> {
    try {
      const tx = await this.client.get_group({ group_id: groupId });
      const result = await tx.simulate();
      
      if (result.result && 'Some' in result.result) {
        const group = result.result.Some;
        return {
          id: group.id,
          name: group.name,
          creator: group.creator,
          members: group.members,
          total_balance: group.total_balance,
          total_yield: group.total_yield,
          blend_pool_address: group.blend_pool_address ? 
            ('Some' in group.blend_pool_address ? group.blend_pool_address.Some : undefined) : 
            undefined,
          auto_invest_enabled: group.auto_invest_enabled,
          is_active: group.is_active,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting group:', error);
      return null;
    }
  }

  /**
   * Get group balance
   */
  async getGroupBalance(groupId: string): Promise<bigint> {
    try {
      const tx = await this.client.get_group_balance({ group_id: groupId });
      const result = await tx.simulate();
      return result.result || BigInt(0);
    } catch (error) {
      console.error('Error getting group balance:', error);
      return BigInt(0);
    }
  }

  /**
   * Get member balance in a group
   */
  async getMemberBalance(groupId: string, member: string): Promise<bigint> {
    try {
      const tx = await this.client.get_member_balance({ group_id: groupId, member });
      const result = await tx.simulate();
      return result.result || BigInt(0);
    } catch (error) {
      console.error('Error getting member balance:', error);
      return BigInt(0);
    }
  }

  /**
   * Get user's groups
   */
  async getUserGroups(user: string): Promise<string[]> {
    try {
      const tx = await this.client.get_user_groups({ user });
      const result = await tx.simulate();
      return result.result || [];
    } catch (error) {
      console.error('Error getting user groups:', error);
      return [];
    }
  }

  /**
   * Get group members
   */
  async getGroupMembers(groupId: string): Promise<string[]> {
    try {
      const tx = await this.client.get_group_members({ group_id: groupId });
      const result = await tx.simulate();
      return result.result || [];
    } catch (error) {
      console.error('Error getting group members:', error);
      return [];
    }
  }

  /**
   * Check if user is group admin
   */
  async isGroupAdmin(groupId: string, user: string): Promise<boolean> {
    try {
      const tx = await this.client.is_group_admin({ group_id: groupId, user });
      const result = await tx.simulate();
      return result.result || false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  /**
   * Get total group count
   */
  async getGroupCount(): Promise<number> {
    try {
      const tx = await this.client.get_group_count();
      const result = await tx.simulate();
      return Number(result.result || 0);
    } catch (error) {
      console.error('Error getting group count:', error);
      return 0;
    }
  }

  /**
   * Set Blend pool address (admin only)
   */
  async setBlendPool(admin: string, blendPoolAddress: string, walletKit: StellarWalletsKit): Promise<string> {
    try {
      const { publicKey } = await walletKit.getPublicKey();
      
      const tx = await this.client.set_blend_pool({
        admin,
        blend_pool_address: blendPoolAddress,
      });

      const signedTx = await walletKit.signTransaction(tx.toXDR(), {
        address: publicKey,
        networkPassphrase: this.networkPassphrase,
      });

      const result = await this.rpc.sendTransaction(signedTx);
      
      if (result.status === 'ERROR') {
        throw new Error(result.errorResult?.toXDR() || 'Transaction failed');
      }

      return result.hash;
    } catch (error) {
      console.error('Error setting Blend pool:', error);
      throw new Error('Failed to set Blend pool address');
    }
  }

  /**
   * Get Blend pool address
   */
  async getBlendPool(): Promise<string | null> {
    try {
      const tx = await this.client.get_blend_pool();
      const result = await tx.simulate();
      
      if (result.result && 'Some' in result.result) {
        return result.result.Some;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting Blend pool:', error);
      return null;
    }
  }

  /**
   * Deposit to Blend for yield generation
   */
  async depositToBlend(params: BlendOperationParams, walletKit: StellarWalletsKit): Promise<string> {
    try {
      const { publicKey } = await walletKit.getPublicKey();
      
      const tx = await this.client.deposit_to_blend({
        group_id: params.groupId,
        amount: params.amount,
        token_address: params.tokenAddress,
      });

      const signedTx = await walletKit.signTransaction(tx.toXDR(), {
        address: publicKey,
        networkPassphrase: this.networkPassphrase,
      });

      const result = await this.rpc.sendTransaction(signedTx);
      
      if (result.status === 'ERROR') {
        throw new Error(result.errorResult?.toXDR() || 'Transaction failed');
      }

      return result.hash;
    } catch (error) {
      console.error('Error depositing to Blend:', error);
      throw new Error('Failed to deposit to Blend protocol');
    }
  }

  /**
   * Withdraw from Blend protocol
   */
  async withdrawFromBlend(
    admin: string, 
    params: BlendOperationParams, 
    walletKit: StellarWalletsKit
  ): Promise<string> {
    try {
      const { publicKey } = await walletKit.getPublicKey();
      
      const tx = await this.client.withdraw_from_blend({
        admin,
        group_id: params.groupId,
        amount: params.amount,
        token_address: params.tokenAddress,
      });

      const signedTx = await walletKit.signTransaction(tx.toXDR(), {
        address: publicKey,
        networkPassphrase: this.networkPassphrase,
      });

      const result = await this.rpc.sendTransaction(signedTx);
      
      if (result.status === 'ERROR') {
        throw new Error(result.errorResult?.toXDR() || 'Transaction failed');
      }

      return result.hash;
    } catch (error) {
      console.error('Error withdrawing from Blend:', error);
      throw new Error('Failed to withdraw from Blend protocol');
    }
  }

  /**
   * Distribute yield to group members
   */
  async distributeYield(groupId: string, walletKit: StellarWalletsKit): Promise<string> {
    try {
      const { publicKey } = await walletKit.getPublicKey();
      
      const tx = await this.client.distribute_yield({ group_id: groupId });

      const signedTx = await walletKit.signTransaction(tx.toXDR(), {
        address: publicKey,
        networkPassphrase: this.networkPassphrase,
      });

      const result = await this.rpc.sendTransaction(signedTx);
      
      if (result.status === 'ERROR') {
        throw new Error(result.errorResult?.toXDR() || 'Transaction failed');
      }

      return result.hash;
    } catch (error) {
      console.error('Error distributing yield:', error);
      throw new Error('Failed to distribute yield');
    }
  }

  /**
   * Get group yield
   */
  async getGroupYield(groupId: string): Promise<bigint> {
    try {
      const tx = await this.client.get_group_yield({ group_id: groupId });
      const result = await tx.simulate();
      return result.result || BigInt(0);
    } catch (error) {
      console.error('Error getting group yield:', error);
      return BigInt(0);
    }
  }

  /**
   * Check if auto-invest is enabled for a group
   */
  async isAutoInvestEnabled(groupId: string): Promise<boolean> {
    try {
      const tx = await this.client.is_auto_invest_enabled({ group_id: groupId });
      const result = await tx.simulate();
      return result.result || false;
    } catch (error) {
      console.error('Error checking auto-invest status:', error);
      return false;
    }
  }

  /**
   * Utility function to convert between different numeric types
   */
  static toContractAmount(amount: number): bigint {
    // Convert to 7 decimal places (Stellar standard)
    return BigInt(Math.floor(amount * 10000000));
  }

  /**
   * Utility function to convert from contract amount to display amount
   */
  static fromContractAmount(amount: bigint): number {
    // Convert from 7 decimal places
    return Number(amount) / 10000000;
  }

  /**
   * Format contract address for display
   */
  static formatAddress(address: string): string {
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  /**
   * Validate Stellar address format
   */
  static isValidAddress(address: string): boolean {
    try {
      Keypair.fromPublicKey(address);
      return true;
    } catch {
      return false;
    }
  }
}