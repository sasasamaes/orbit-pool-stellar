import { Horizon, Networks } from "@stellar/stellar-sdk";

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
          balance.asset_issuer ===
            "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5" // Testnet USDC
      );

      return usdcBalance ? parseFloat(usdcBalance.balance) : 0;
    } catch (error) {
      console.error("Error getting USDC balance:", error);
      return 0;
    }
  }
}
