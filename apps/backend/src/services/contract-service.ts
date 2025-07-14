import { Keypair } from "@stellar/stellar-sdk";
import {
  Client,
  networks,
} from "../../../../packages/contracts/bindings/community_wallet";

export interface ContractServiceConfig {
  networkPassphrase: string;
  rpcUrl: string;
  contractId: string;
}

export class ContractService {
  private client: Client;

  constructor(config?: Partial<ContractServiceConfig>) {
    // Use testnet configuration by default
    const defaultConfig = {
      networkPassphrase: networks.testnet.networkPassphrase,
      rpcUrl: "https://soroban-testnet.stellar.org:443",
      contractId: networks.testnet.contractId,
    };

    const finalConfig = { ...defaultConfig, ...config };

    this.client = new Client(finalConfig);

    console.log(`📋 ContractService initialized:`);
    console.log(`   - Network: ${finalConfig.networkPassphrase}`);
    console.log(`   - RPC: ${finalConfig.rpcUrl}`);
    console.log(`   - Contract: ${finalConfig.contractId}`);
  }

  /**
   * Realizar inversión manual usando el contrato inteligente
   */
  async manualInvestToBlend(
    adminKeypair: Keypair,
    groupId: string,
    amount: number,
    tokenAddress: string
  ): Promise<string> {
    try {
      console.log(`🏛️ Ejecutando inversión manual via contrato inteligente...`);
      console.log(`📋 Parámetros:`);
      console.log(`   - Admin: ${adminKeypair.publicKey()}`);
      console.log(`   - Group ID: ${groupId}`);
      console.log(`   - Amount: ${amount} USDC`);
      console.log(`   - Token: ${tokenAddress}`);

      // Convert amount to BigInt (USDC has 7 decimal places, so multiply by 10^7)
      const amountStroops = BigInt(amount * 10_000_000);

      // Call the contract function
      const transactionHash = await this.client.manualInvestToBlend({
        admin: adminKeypair.publicKey(),
        group_id: groupId,
        amount: amountStroops,
        token_address: tokenAddress,
      });

      console.log(`✅ Inversión manual ejecutada exitosamente via contrato:`);
      console.log(`   - Transaction Hash: ${transactionHash}`);
      console.log(`   - Amount: ${amount} USDC (${amountStroops} stroops)`);
      console.log(`   - Contract: ${this.client.options.contractId}`);

      return transactionHash;
    } catch (error: any) {
      console.error(`❌ Error en inversión manual via contrato:`, error);
      throw new Error(`Contract manual investment failed: ${error.message}`);
    }
  }

  /**
   * Retirar inversión de Blend usando el contrato
   */
  async withdrawBlendInvestment(
    adminKeypair: Keypair,
    groupId: string,
    amount: number,
    tokenAddress: string
  ): Promise<string> {
    try {
      console.log(`🏧 Ejecutando retiro de Blend via contrato...`);

      const amountStroops = BigInt(amount * 10_000_000);

      const transactionHash = await this.client.withdrawBlendInvestment({
        admin: adminKeypair.publicKey(),
        group_id: groupId,
        amount: amountStroops,
        token_address: tokenAddress,
      });

      console.log(
        `✅ Retiro ejecutado exitosamente via contrato: ${transactionHash}`
      );
      return transactionHash;
    } catch (error: any) {
      console.error(`❌ Error en retiro via contrato:`, error);
      throw new Error(`Contract withdrawal failed: ${error.message}`);
    }
  }

  /**
   * Obtener historial de inversiones usando el contrato
   */
  async getInvestmentHistory(groupId: string): Promise<string[]> {
    try {
      console.log(
        `📊 Obteniendo historial de inversiones via contrato para grupo ${groupId}...`
      );

      const history = await this.client.getInvestmentHistory({
        group_id: groupId,
      });

      console.log(`✅ Historial obtenido: ${history.length} registros`);
      return history;
    } catch (error: any) {
      console.error(`❌ Error obteniendo historial via contrato:`, error);
      return [];
    }
  }

  /**
   * Verificar si auto-invest está habilitado
   */
  async isAutoInvestEnabled(groupId: string): Promise<boolean> {
    try {
      const enabled = await this.client.isAutoInvestEnabled({
        group_id: groupId,
      });

      console.log(
        `🔍 Auto-invest para grupo ${groupId}: ${enabled ? "habilitado" : "deshabilitado"}`
      );
      return enabled;
    } catch (error: any) {
      console.error(`❌ Error verificando auto-invest:`, error);
      return false;
    }
  }

  /**
   * Obtener información del contrato
   */
  getContractInfo() {
    return {
      contractId: this.client.options.contractId,
      networkPassphrase: this.client.options.networkPassphrase,
      rpcUrl: this.client.options.rpcUrl,
    };
  }
}

// Instancia singleton para uso en toda la aplicación
export const contractService = new ContractService();
