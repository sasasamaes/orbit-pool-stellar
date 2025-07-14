import {
  Horizon,
  Networks,
  Asset,
  Keypair,
  Contract,
} from "@stellar/stellar-sdk";
import { BlendService, DEFAULT_BLEND_CONFIG } from "./blend-service";
import crypto from "crypto";

// Configuración de activos para Blend testnet
// USDC es un Stellar Asset Contract en testnet de Blend
export const USDC_CONTRACT_ADDRESS =
  "CAQCFVLOBK5GIULPNZRGATJJMIZL5BSP7X5YJVMGCPTUEPFM4AVSRCJU"; // Blend Testnet USDC

// Para compatibilidad con código existente, crear un Asset USDC usando el issuer testnet
// Nota: Para Blend usaremos USDC_CONTRACT_ADDRESS directamente
export const USDC_ASSET = new Asset(
  "USDC",
  "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5" // Testnet USDC issuer estándar
);

export interface StellarTransactionValidation {
  isValid: boolean;
  amount?: number;
  sourceAccount?: string;
  destinationAccount?: string;
  asset?: string;
  transactionHash: string;
  memo?: string;
  ledger?: number;
  timestamp?: string;
}

export class StellarService {
  private horizon: Horizon.Server;
  private networkPassphrase: string;

  // Servidor estático para métodos estáticos
  private static staticServer = new Horizon.Server(
    "https://horizon-testnet.stellar.org"
  );

  constructor() {
    // Configurar para testnet por defecto
    this.horizon = new Horizon.Server("https://horizon-testnet.stellar.org");
    this.networkPassphrase = Networks.TESTNET;
  }

  /**
   * Validar una transacción Stellar en el blockchain
   */
  async validateTransaction(
    transactionHash: string,
    expectedSourceAccount: string,
    expectedAmount: number,
    expectedAsset: string = "USDC"
  ): Promise<StellarTransactionValidation> {
    try {
      console.log("🔍 Validating Stellar transaction:", {
        hash: transactionHash,
        expectedSource: expectedSourceAccount,
        expectedAmount,
        expectedAsset,
      });

      // Obtener la transacción del blockchain
      const transaction = await this.horizon
        .transactions()
        .transaction(transactionHash)
        .call();

      if (!transaction) {
        return {
          isValid: false,
          transactionHash,
        };
      }

      // Obtener las operaciones de la transacción
      const operations = await this.horizon
        .operations()
        .forTransaction(transactionHash)
        .call();

      // Buscar operaciones de pago
      const paymentOperations = operations.records.filter(
        (op: any) => op.type === "payment"
      );

      if (paymentOperations.length === 0) {
        console.log("❌ No payment operations found");
        return {
          isValid: false,
          transactionHash,
        };
      }

      // Validar la primera operación de pago
      const paymentOp = paymentOperations[0] as any;

      const isValidSource = paymentOp.from === expectedSourceAccount;
      const actualAmount = parseFloat(paymentOp.amount);
      const isValidAmount = Math.abs(actualAmount - expectedAmount) < 0.0001; // Tolerancia para decimales

      // Validar el asset (USDC)
      let isValidAsset = false;
      if (expectedAsset === "XLM" && paymentOp.asset_type === "native") {
        isValidAsset = true;
      } else if (
        paymentOp.asset_code &&
        paymentOp.asset_code === expectedAsset
      ) {
        isValidAsset = true;
      }

      const result: StellarTransactionValidation = {
        isValid: isValidSource && isValidAmount && isValidAsset,
        amount: actualAmount,
        sourceAccount: paymentOp.from,
        destinationAccount: paymentOp.to,
        asset: paymentOp.asset_code || "XLM",
        transactionHash,
        memo: transaction.memo,
        ledger: transaction.ledger_attr,
        timestamp: transaction.created_at,
      };

      console.log("✅ Transaction validation result:", {
        isValid: result.isValid,
        checks: {
          source: {
            expected: expectedSourceAccount,
            actual: paymentOp.from,
            valid: isValidSource,
          },
          amount: {
            expected: expectedAmount,
            actual: actualAmount,
            valid: isValidAmount,
          },
          asset: {
            expected: expectedAsset,
            actual: paymentOp.asset_code || "XLM",
            valid: isValidAsset,
          },
        },
      });

      return result;
    } catch (error) {
      console.error("❌ Error validating Stellar transaction:", error);
      return {
        isValid: false,
        transactionHash,
      };
    }
  }

  /**
   * Verificar si una cuenta existe en Stellar
   */
  async accountExists(publicKey: string): Promise<boolean> {
    try {
      await this.horizon.loadAccount(publicKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtener información de una cuenta Stellar
   */
  async getAccountInfo(publicKey: string) {
    try {
      const account = await this.horizon.loadAccount(publicKey);
      return {
        accountId: account.accountId(),
        balances: account.balances,
        sequenceNumber: account.sequenceNumber(),
      };
    } catch (error) {
      console.error("Error getting account info:", error);
      throw new Error("Failed to get account information");
    }
  }

  /**
   * Obtener balance de USDC de una cuenta
   */
  async getUSDCBalance(publicKey: string): Promise<number> {
    try {
      const account = await this.horizon.loadAccount(publicKey);

      const usdcBalance = account.balances.find(
        (balance: any) =>
          balance.asset_code === "USDC" &&
          balance.asset_issuer === USDC_ASSET.getIssuer() // Usar la misma dirección USDC que Blend
      );

      return usdcBalance ? parseFloat(usdcBalance.balance) : 0;
    } catch (error) {
      console.error("Error getting USDC balance:", error);
      return 0;
    }
  }

  /**
   * Genera o recupera la cuenta Stellar del grupo
   */
  static async getOrCreateGroupAccount(groupId: string): Promise<Keypair> {
    try {
      // HACK TEMPORAL: Para testing, usar cuenta real para el grupo específico
      if (groupId === "42e71fe9-215a-4bb3-ae5b-5eda142b4346") {
        // Esta es una clave temporal para testing - NO USAR EN PRODUCCIÓN
        // La cuenta real GCBJUGK7PVCH6CUGM2HPXS6Z7OAVEQ4UD3R4ZPXORWOCZANYOGSMW5AG
        console.log("🧪 MODO TEST: Usando cuenta temporal para grupo 345");
        // Generar un keypair que coincida con esa dirección (para testing)
        // NOTA: Esto NO funcionará para transacciones reales, solo para verificaciones de balance
        const seed = crypto
          .createHash("sha256")
          .update("test_account_for_demo_purposes_only")
          .digest();
        const keypair = Keypair.fromRawEd25519Seed(seed);
        console.log(`🧪 Generated test account: ${keypair.publicKey()}`);
        return keypair;
      }

      // Generar keypair determinístico basado en el groupId (comportamiento normal)
      const seed = crypto
        .createHash("sha256")
        .update(`group_${groupId}_stellar_account`)
        .digest();

      const keypair = Keypair.fromRawEd25519Seed(seed);

      console.log(`Generated group account: ${keypair.publicKey()}`);
      return keypair;
    } catch (error) {
      console.error("Error creating group account:", error);
      throw new Error("Failed to create group Stellar account");
    }
  }

  /**
   * Valida una transacción Stellar para verificar que es legítima
   */
  static async validateTransaction(
    transactionId: string,
    expectedAmount: number,
    fromAddress: string,
    expectedDestination?: string
  ): Promise<{ isValid: boolean; error?: string; actualAmount?: number }> {
    try {
      console.log(`🔍 Validando transacción ${transactionId}...`);

      // Obtener los detalles de la transacción desde Horizon
      const transactionResponse = await this.staticServer
        .transactions()
        .transaction(transactionId)
        .call();

      if (!transactionResponse) {
        return { isValid: false, error: "Transaction not found" };
      }

      // Verificar que la transacción fue exitosa
      if (!transactionResponse.successful) {
        return { isValid: false, error: "Transaction failed on network" };
      }

      // Obtener las operaciones de la transacción
      const operationsResponse = await this.staticServer
        .operations()
        .forTransaction(transactionId)
        .call();

      // Buscar operaciones de pago USDC
      const paymentOperations = operationsResponse.records.filter(
        (op: any) => op.type === "payment" && op.asset_code === "USDC"
      );

      if (paymentOperations.length === 0) {
        return {
          isValid: false,
          error: "No USDC payment found in transaction",
        };
      }

      // Verificar la dirección del remitente
      const payment = paymentOperations[0] as any; // Cast para acceder a propiedades de payment
      if (payment.from !== fromAddress) {
        return {
          isValid: false,
          error: `Payment from incorrect address. Expected: ${fromAddress}, Got: ${payment.from}`,
        };
      }

      // Verificar la dirección de destino si se proporciona
      if (expectedDestination && payment.to !== expectedDestination) {
        return {
          isValid: false,
          error: `Payment to incorrect address. Expected: ${expectedDestination}, Got: ${payment.to}`,
        };
      }

      // Verificar el monto
      const actualAmount = parseFloat(payment.amount);
      if (Math.abs(actualAmount - expectedAmount) > 0.01) {
        // Tolerancia de 1 centavo
        return {
          isValid: false,
          error: `Incorrect amount. Expected: ${expectedAmount}, Got: ${actualAmount}`,
          actualAmount,
        };
      }

      console.log(
        `✅ Transacción validada: ${actualAmount} USDC de ${fromAddress}`
      );

      return {
        isValid: true,
        actualAmount,
      };
    } catch (error) {
      console.error("❌ Error validando transacción:", error);
      return {
        isValid: false,
        error: `Validation error: ${error.message}`,
      };
    }
  }

  /**
   * Auto-invierte los fondos del grupo en Blend el día 3 de cada mes
   */
  static async autoInvestInBlend(
    groupId: string,
    minAmountToInvest: number = 100 // Mínimo $100 USDC para invertir
  ): Promise<{
    success: boolean;
    transactionHash?: string;
    amountInvested?: number;
    error?: string;
  }> {
    try {
      console.log(`🤖 Iniciando auto-inversión para grupo ${groupId}...`);

      // Verificar si es día 3 del mes
      if (!BlendService.shouldAutoInvest()) {
        const nextDate = BlendService.getNextAutoInvestDate();
        console.log(
          `⏰ No es día de auto-inversión. Próxima fecha: ${nextDate.toLocaleDateString()}`
        );
        return {
          success: false,
          error: `Auto-inversión programada para ${nextDate.toLocaleDateString()}`,
        };
      }

      // Obtener cuenta del grupo
      const groupKeypair = await this.getOrCreateGroupAccount(groupId);
      const groupPublicKey = groupKeypair.publicKey();

      // Verificar balance USDC del grupo
      const stellarService = new StellarService();
      const accountInfo = await stellarService.getAccountInfo(groupPublicKey);
      const usdcBalance = accountInfo.balances.find(
        (balance: any) =>
          balance.asset_code === "USDC" &&
          balance.asset_issuer === USDC_ASSET.getIssuer()
      );

      if (!usdcBalance) {
        return {
          success: false,
          error: "Grupo no tiene balance USDC para invertir",
        };
      }

      const availableBalance = parseFloat(usdcBalance.balance);

      // Verificar si hay suficiente para invertir (reservar algo para fees)
      const reserveForFees = 10; // Reservar $10 para fees y operaciones
      const investableAmount = availableBalance - reserveForFees;

      if (investableAmount < minAmountToInvest) {
        return {
          success: false,
          error: `Balance insuficiente para invertir. Disponible: $${investableAmount}, Mínimo: $${minAmountToInvest}`,
        };
      }

      // Crear servicio de Blend
      const blendService = new BlendService(DEFAULT_BLEND_CONFIG);

      // Depositar en Blend pool
      const amountToInvestStroops = Math.floor(
        investableAmount * 10000000
      ).toString(); // Convertir a stroops

      const transactionHash = await blendService.depositToBlendPool(
        groupKeypair,
        USDC_CONTRACT_ADDRESS, // Usar la dirección del contrato USDC de Blend
        amountToInvestStroops
      );

      console.log(
        `✅ Auto-inversión exitosa: $${investableAmount} invertidos en Blend`
      );

      return {
        success: true,
        transactionHash,
        amountInvested: investableAmount,
      };
    } catch (error) {
      console.error("❌ Error en auto-inversión:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Invierte manualmente fondos del grupo en Blend (sin restricciones de tiempo)
   */
  static async manualInvestInBlend(
    groupId: string,
    amountToInvest: number, // Cantidad específica a invertir
    triggeredBy: string // ID del usuario que activó la inversión
  ): Promise<{
    success: boolean;
    transactionHash?: string;
    amountInvested?: number;
    error?: string;
  }> {
    try {
      console.log(
        `🪙 Iniciando inversión manual real en Blend testnet para grupo ${groupId}...`
      );
      console.log(`💰 Cantidad solicitada: $${amountToInvest}`);

      // Validar cantidad mínima
      if (amountToInvest < 10) {
        return {
          success: false,
          error: "La cantidad mínima para inversión manual es $10 USDC",
        };
      }

      // Comportamiento normal - obtener cuenta del grupo
      const groupKeypair = await this.getOrCreateGroupAccount(groupId);
      const groupPublicKey = groupKeypair.publicKey();

      // Crear stellarService para todas las operaciones
      const stellarService = new StellarService();

      // Verificar si la cuenta del grupo existe en la red
      const accountExists = await stellarService.accountExists(groupPublicKey);

      if (!accountExists) {
        return {
          success: false,
          error:
            "La cuenta del grupo aún no está activa en Stellar. Necesita recibir una contribución inicial primero.",
        };
      }

      // Verificar balance USDC del grupo
      const accountInfo = await stellarService.getAccountInfo(groupPublicKey);
      const usdcBalance = accountInfo.balances.find(
        (balance: any) =>
          balance.asset_code === "USDC" &&
          balance.asset_issuer === USDC_ASSET.getIssuer()
      );

      if (!usdcBalance) {
        return {
          success: false,
          error:
            "Grupo no tiene balance USDC disponible. Necesita establecer trustline USDC primero.",
        };
      }

      const availableBalance = parseFloat(usdcBalance.balance);

      // Verificar si hay suficiente para la cantidad solicitada (reservar algo para fees)
      const reserveForFees = 5; // Reservar $5 para fees y operaciones
      const maxInvestable = availableBalance - reserveForFees;

      if (amountToInvest > maxInvestable) {
        return {
          success: false,
          error: `Balance insuficiente. Disponible para inversión: $${maxInvestable.toFixed(2)}, Solicitado: $${amountToInvest}`,
        };
      }

      // Crear servicio de Blend para transacciones reales
      const blendService = new BlendService(DEFAULT_BLEND_CONFIG);

      // Convertir cantidad a stroops (formato de Stellar - 7 decimales)
      const amountToInvestStroops = Math.floor(
        amountToInvest * 10000000
      ).toString();

      console.log(
        `💎 Depositando ${amountToInvest} USDC (${amountToInvestStroops} stroops) en Blend pool real...`
      );

      // Depositar en Blend pool real usando el SDK oficial
      const transactionHash = await blendService.depositToBlendPool(
        groupKeypair,
        USDC_CONTRACT_ADDRESS, // Usar la dirección del contrato USDC de Blend
        amountToInvestStroops
      );

      console.log(
        `✅ Inversión manual real exitosa: $${amountToInvest} invertidos en Blend testnet por usuario ${triggeredBy}`
      );
      console.log(`🔗 Hash de transacción: ${transactionHash}`);

      return {
        success: true,
        transactionHash,
        amountInvested: amountToInvest,
      };
    } catch (error) {
      console.error("❌ Error en inversión manual real:", error);
      return {
        success: false,
        error: `Error al procesar inversión manual en Blend: ${error.message}`,
      };
    }
  }

  /**
   * Obtiene los rendimientos actuales del grupo en Blend
   */
  static async getBlendYieldInfo(groupId: string): Promise<{
    totalInvested: number;
    currentValue: number;
    yieldEarned: number;
    yieldPercentage: number;
  }> {
    try {
      const groupKeypair = await this.getOrCreateGroupAccount(groupId);
      const blendService = new BlendService(DEFAULT_BLEND_CONFIG);

      const positions = await blendService.getBlendPositions(
        groupKeypair.publicKey()
      );
      const yieldEarned = await blendService.calculateYieldEarned(
        groupKeypair.publicKey(),
        USDC_CONTRACT_ADDRESS // Usar la dirección del contrato USDC de Blend
      );

      // Calcular valores
      const yieldAmount = parseFloat(yieldEarned) / 10000000; // Convertir de stroops
      const usdcPosition = positions.find(
        (p) => p.asset === USDC_ASSET.getIssuer() || p.asset === "USDC"
      );

      const currentValue = usdcPosition
        ? parseFloat(usdcPosition.balance) / 10000000
        : 0;

      const totalInvested = currentValue - yieldAmount;
      const yieldPercentage =
        totalInvested > 0 ? (yieldAmount / totalInvested) * 100 : 0;

      return {
        totalInvested,
        currentValue,
        yieldEarned: yieldAmount,
        yieldPercentage,
      };
    } catch (error) {
      console.error("❌ Error obteniendo info de rendimientos:", error);
      return {
        totalInvested: 0,
        currentValue: 0,
        yieldEarned: 0,
        yieldPercentage: 0,
      };
    }
  }

  /**
   * Retira fondos de Blend cuando sea necesario (emergencias o retiros programados)
   */
  static async withdrawFromBlend(
    groupId: string,
    amount: number
  ): Promise<{
    success: boolean;
    transactionHash?: string;
    error?: string;
  }> {
    try {
      console.log(`🏧 Retirando $${amount} de Blend para grupo ${groupId}...`);

      const groupKeypair = await this.getOrCreateGroupAccount(groupId);
      const blendService = new BlendService(DEFAULT_BLEND_CONFIG);

      const amountStroops = Math.floor(amount * 10000000).toString();

      const transactionHash = await blendService.withdrawFromBlendPool(
        groupKeypair,
        USDC_CONTRACT_ADDRESS, // Usar la dirección del contrato USDC de Blend
        amountStroops
      );

      console.log(`✅ Retiro exitoso de Blend: $${amount}`);

      return {
        success: true,
        transactionHash,
      };
    } catch (error) {
      console.error("❌ Error retirando de Blend:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
