import {
  Networks,
  Horizon,
  TransactionBuilder,
  Operation,
  Asset,
  Keypair,
  Memo, // AGREGADO para tipos de memo
} from "@stellar/stellar-sdk";

export const STELLAR_NETWORK = "testnet"; // FORZAR SOLO TESTNET

export const HORIZON_URL =
  process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL ||
  (STELLAR_NETWORK === "testnet" 
    ? "https://horizon-testnet.stellar.org"
    : "https://horizon.stellar.org");

export const SOROBAN_RPC_URL = 
  process.env.NEXT_PUBLIC_SOROBAN_RPC_URL ||
  (STELLAR_NETWORK === "testnet"
    ? "https://soroban-testnet.stellar.org"
    : "https://soroban-mainnet.stellar.org");

export const NETWORK_PASSPHRASE =
  STELLAR_NETWORK === "testnet" ? Networks.TESTNET : Networks.PUBLIC;

export const server = new Horizon.Server(HORIZON_URL);

// USDC asset on Stellar - CORREGIDO con direcciones testnet válidas
export const USDC_ASSET = new Asset(
  "USDC",
  STELLAR_NETWORK === "testnet"
    ? "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5" // Testnet USDC correcto
    : "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN" // Mainnet USDC
);

export interface WalletConnection {
  publicKey: string;
  isConnected: boolean;
  name: string;
}

export class StellarService {
  static async getAccountInfo(publicKey: string) {
    try {
      const account = await server.loadAccount(publicKey);
      return account;
    } catch (error) {
      console.error("Error loading account:", error);
      throw new Error("Failed to load account information");
    }
  }

  static async getAccountBalance(publicKey: string, asset?: Asset) {
    try {
      const account = await this.getAccountInfo(publicKey);

      if (!asset) {
        // Return XLM balance
        const xlmBalance = account.balances.find(
          (balance) => balance.asset_type === "native"
        );
        return xlmBalance ? parseFloat(xlmBalance.balance) : 0;
      }

      // Return specific asset balance
      const assetBalance = account.balances.find(
        (balance) =>
          balance.asset_type !== "native" &&
          'asset_code' in balance &&
          'asset_issuer' in balance &&
          balance.asset_code === asset.code &&
          balance.asset_issuer === asset.issuer
      );

      return assetBalance ? parseFloat(assetBalance.balance) : 0;
    } catch (error) {
      console.error("Error getting balance:", error);
      return 0;
    }
  }

  static async buildTransaction(
    sourcePublicKey: string,
    operations: any[],
    memo?: string
  ) {
    try {
      const sourceAccount = await this.getAccountInfo(sourcePublicKey);

      // CORREGIDO: Convertir fee a string
      const baseFee = await server.fetchBaseFee();
      const transaction = new TransactionBuilder(sourceAccount, {
        fee: baseFee.toString(), // CORRECCIÓN: Convertir a string
        networkPassphrase: NETWORK_PASSPHRASE,
      });

      operations.forEach((op) => transaction.addOperation(op));

      // CORREGIDO: Crear memo correctamente
      if (memo) {
        transaction.addMemo(Memo.text(memo)); // CORRECCIÓN: Usar Memo.text()
      }

      return transaction.setTimeout(300).build();
    } catch (error) {
      console.error("Error building transaction:", error);
      throw new Error("Failed to build transaction");
    }
  }

  static async submitTransaction(signedTransaction: any) {
    try {
      const result = await server.submitTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.error("Error submitting transaction:", error);
      throw new Error("Failed to submit transaction");
    }
  }

  static createPaymentOperation(
    destination: string,
    amount: string,
    asset: Asset = Asset.native()
  ) {
    return Operation.payment({
      destination,
      amount,
      asset,
    });
  }

  static async fundTestnetAccount(publicKey: string) {
    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${publicKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fund account");
      }
      return await response.json();
    } catch (error) {
      console.error("Error funding account:", error);
      throw new Error("Failed to fund testnet account");
    }
  }

  // NUEVO: Método para verificar si una cuenta existe
  static async accountExists(publicKey: string): Promise<boolean> {
    try {
      await this.getAccountInfo(publicKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  // NUEVO: Método para crear trustline a USDC
  static async createUSDCTrustline(sourcePublicKey: string) {
    try {
      const changeTrustOp = Operation.changeTrust({
        asset: USDC_ASSET,
      });

      return await this.buildTransaction(sourcePublicKey, [changeTrustOp]);
    } catch (error) {
      console.error("Error creating USDC trustline:", error);
      throw new Error("Failed to create USDC trustline");
    }
  }
}
