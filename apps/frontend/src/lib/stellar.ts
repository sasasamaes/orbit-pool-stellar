import {
  Networks,
  Horizon,
  TransactionBuilder,
  Operation,
  Asset,
  Keypair,
  Memo,
} from "@stellar/stellar-sdk";

export const STELLAR_NETWORK = "testnet";

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

export const USDC_ASSET = new Asset(
  "USDC",
  STELLAR_NETWORK === "testnet"
    ? "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"
    : "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
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
    } catch (error: any) {
      console.error("Error loading account:", error);
      throw error;
    }
  }

  static async getAccountBalance(publicKey: string, asset?: Asset) {
    try {
      const account = await this.getAccountInfo(publicKey);

      if (!asset || asset.isNative()) {
        const nativeBalance = account.balances.find(
          (balance: any) => balance.asset_type === "native"
        );
        return nativeBalance ? parseFloat(nativeBalance.balance) : 0;
      } else {
        const assetBalance = account.balances.find(
          (balance: any) =>
            balance.asset_type !== "native" &&
            balance.asset_code === asset.getCode() &&
            balance.asset_issuer === asset.getIssuer()
        );
        return assetBalance ? parseFloat(assetBalance.balance) : 0;
      }
    } catch (error: any) {
      console.error("Error getting account balance:", error);
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

      let transaction = new TransactionBuilder(sourceAccount, {
        fee: "1000000", // 0.1 XLM
        networkPassphrase: NETWORK_PASSPHRASE,
      });

      operations.forEach((operation) => {
        transaction = transaction.addOperation(operation);
      });

      if (memo) {
        transaction = transaction.addMemo(Memo.text(memo));
      }

      return transaction.setTimeout(300).build();
    } catch (error: any) {
      console.error("Error building transaction:", error);
      throw new Error("Failed to build transaction");
    }
  }

  static async submitTransaction(signedTransactionXDR: string) {
    try {
      console.log("🚀 Submitting transaction to Stellar network...");

      // Parse the signed XDR back to a Transaction object
      console.log("📋 Parsing signed XDR to Transaction object...");
      const transaction = TransactionBuilder.fromXDR(
        signedTransactionXDR,
        "Test SDF Network ; September 2015"
      );

      console.log("🔄 Submitting parsed transaction to server...");
      const result = await server.submitTransaction(transaction);
      console.log("✅ Transaction submitted successfully:", result.hash);
      return result;
    } catch (error: any) {
      console.error("❌ Error submitting transaction:", error);

      // Manejo mejorado de errores
      let errorMessage = "Failed to submit transaction";

      try {
        if (error && error.response && error.response.data) {
          console.error("📊 Stellar error details:", error.response.data);

          // Extraer información específica del error de manera segura
          const data = error.response.data;

          if (data.extras && data.extras.result_codes) {
            const resultCodes = data.extras.result_codes;
            console.log("🔍 Result codes:", resultCodes);

            // Verificar transaction code y traducir a mensajes específicos
            if (resultCodes.transaction) {
              const txCode = resultCodes.transaction;
              switch (txCode) {
                case "tx_insufficient_balance":
                  errorMessage =
                    "Insufficient XLM balance for transaction fees";
                  break;
                case "tx_no_source_account":
                  errorMessage = "Source account does not exist";
                  break;
                case "tx_bad_seq":
                  errorMessage = "Invalid sequence number - please try again";
                  break;
                case "tx_bad_auth":
                  errorMessage = "Transaction signature is invalid";
                  break;
                case "tx_failed":
                  errorMessage = "Transaction failed - check operation details";
                  break;
                default:
                  errorMessage = `Transaction failed: ${txCode}`;
              }
            }
            // Verificar operation codes
            else if (
              resultCodes.operations &&
              Array.isArray(resultCodes.operations)
            ) {
              const opCodes = resultCodes.operations;
              console.log("🔍 Operation codes:", opCodes);

              // Mapear códigos de operación a mensajes específicos
              const operationErrors = opCodes.map((code: string) => {
                switch (code) {
                  case "op_no_destination":
                    return "Destination account does not exist - group account needs to be created";
                  case "op_no_trust":
                    return "Destination account has no USDC trustline";
                  case "op_underfunded":
                    return "Insufficient USDC balance in your wallet";
                  case "op_line_full":
                    return "Destination account USDC balance would exceed limit";
                  case "op_no_issuer":
                    return "USDC asset issuer not found";
                  case "op_not_authorized":
                    return "Transaction not authorized";
                  case "op_malformed":
                    return "Transaction operation is malformed";
                  case "op_cross_asset":
                    return "Cross-asset payment not allowed";
                  case "op_no_source_account":
                    return "Source account does not exist";
                  default:
                    return `Unknown operation error: ${code}`;
                }
              });

              errorMessage = `${operationErrors.join(", ")}`;
            }
          }

          // Si no hay result_codes, intentar con el título general
          if (data.title) {
            errorMessage = `Transaction failed: ${data.title}`;
          }

          // Si hay detalles adicionales, agregarlos
          if (data.detail && data.detail !== data.title) {
            errorMessage += ` - ${data.detail}`;
          }
        }

        // Manejo de errores específicos comunes
        if (error.message) {
          if (error.message.includes("insufficient funds")) {
            errorMessage =
              "Insufficient funds in your account for this transaction";
          } else if (error.message.includes("trustline")) {
            errorMessage = "USDC trustline not established or invalid";
          } else if (error.message.includes("destination is invalid")) {
            errorMessage = "Invalid destination address";
          } else if (error.message.includes("timeout")) {
            errorMessage = "Transaction timeout - please try again";
          }
        }
      } catch (parseError) {
        console.error("❌ Error parsing Stellar error response:", parseError);
        errorMessage = "Failed to submit transaction - network error";
      }

      throw new Error(errorMessage);
    }
  }

  static createPaymentOperation(
    destination: string,
    amount: string,
    asset: Asset = Asset.native()
  ) {
    if (!this.isValidStellarAddress(destination)) {
      throw new Error(`destination is invalid: ${destination}`);
    }

    return Operation.payment({
      destination,
      asset,
      amount,
    });
  }

  static isValidStellarAddress(address: string): boolean {
    try {
      return (
        typeof address === "string" &&
        address.length === 56 &&
        (address.startsWith("G") || address.startsWith("M"))
      );
    } catch {
      return false;
    }
  }

  static async getOrCreateGroupAccount(groupId: string): Promise<string> {
    try {
      // Por ahora, generar una cuenta determinística basada en el groupId
      // En producción, esto debería usar el contrato inteligente del grupo
      const seed = `group-${groupId}`;
      const hash = require("crypto").createHash("sha256").update(seed).digest();
      const keypair = Keypair.fromRawEd25519Seed(hash.slice(0, 32));

      const publicKey = keypair.publicKey();
      console.log(`Generated group account: ${publicKey}`);

      // Verificar si la cuenta existe
      const exists = await this.accountExists(publicKey);
      if (!exists) {
        // Fondear la cuenta en testnet
        console.log("🏦 Funding new group account...");
        await this.fundTestnetAccount(publicKey);

        // Esperar un momento para que la cuenta se active
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      // Verificar si la cuenta tiene trustline USDC
      try {
        const accountInfo = await this.getAccountInfo(publicKey);
        const hasUSDCTrustline = accountInfo.balances.some(
          (balance: any) =>
            balance.asset_code === "USDC" &&
            balance.asset_issuer === USDC_ASSET.getIssuer()
        );

        if (!hasUSDCTrustline) {
          console.log("💰 Creating USDC trustline for group account...");
          await this.createGroupUSDCTrustline(keypair);
        } else {
          console.log("✅ Group account already has USDC trustline");
        }
      } catch (trustlineError) {
        console.warn(
          "⚠️ Could not verify/create USDC trustline:",
          trustlineError
        );
        // Continue anyway - this might work if the account was just created
      }

      return publicKey;
    } catch (error: any) {
      console.error("Error getting/creating group account:", error);
      throw error;
    }
  }

  static async fundTestnetAccount(publicKey: string) {
    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${publicKey}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fund account: ${response.statusText}`);
      }
      console.log(`✅ Account ${publicKey} funded successfully`);
    } catch (error: any) {
      console.error("Error funding testnet account:", error);
      throw error;
    }
  }

  static async accountExists(publicKey: string): Promise<boolean> {
    try {
      await this.getAccountInfo(publicKey);
      return true;
    } catch (error: any) {
      return false;
    }
  }

  static async createUSDCTrustline(sourcePublicKey: string) {
    try {
      const trustlineOperation = Operation.changeTrust({
        asset: USDC_ASSET,
      });

      return this.buildTransaction(
        sourcePublicKey,
        [trustlineOperation],
        "Create USDC trustline"
      );
    } catch (error: any) {
      console.error("Error creating USDC trustline:", error);
      throw error;
    }
  }

  static async createGroupUSDCTrustline(groupKeypair: Keypair) {
    try {
      console.log("🔐 Creating USDC trustline for group account...");

      // Get account info to get current sequence
      const accountInfo = await this.getAccountInfo(groupKeypair.publicKey());

      // Build trustline transaction
      const transaction = new TransactionBuilder(accountInfo, {
        fee: "100000", // Higher fee for reliable execution
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.changeTrust({
            asset: USDC_ASSET,
          })
        )
        .setTimeout(30)
        .build();

      // Sign transaction with group's private key
      transaction.sign(groupKeypair);

      // Submit transaction
      const result = await server.submitTransaction(transaction);
      console.log("✅ USDC trustline created for group account:", result.hash);

      return result;
    } catch (error: any) {
      console.error("❌ Error creating group USDC trustline:", error);
      throw error;
    }
  }
}
