#!/bin/bash
# Script para corregir errores de balance y transacciones Stellar

echo "🔧 Corrigiendo errores de balance y transacciones Stellar..."
echo ""

echo "1️⃣ Verificando función de balance en base de datos..."

# Verificar si tenemos acceso a la base de datos
cd apps/backend

# Probar la función de balance directamente
cat > test-balance-function.js << 'EOF'
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testBalanceFunction() {
  console.log('🧪 Probando función calculate_group_balance...');
  
  try {
    // Probar con un UUID de ejemplo
    const testGroupId = '7697284f-4eb2-4598-826f-6874038197f5';
    
    const { data, error } = await supabase.rpc('calculate_group_balance', {
      group_uuid: testGroupId
    });
    
    if (error) {
      console.log('❌ Error en función de balance:', error);
      console.log('💡 Detalles del error:', JSON.stringify(error, null, 2));
      return false;
    }
    
    console.log('✅ Función de balance funciona correctamente');
    console.log('💰 Balance calculado:', data);
    return true;
    
  } catch (error) {
    console.log('❌ Error ejecutando función:', error.message);
    return false;
  }
}

testBalanceFunction().then(success => {
  if (!success) {
    console.log('');
    console.log('🔧 POSIBLES SOLUCIONES:');
    console.log('   • Verificar que la función calculate_group_balance existe');
    console.log('   • Revisar permisos de la función');
    console.log('   • Verificar que el grupo existe en la base de datos');
  }
  process.exit(success ? 0 : 1);
});
EOF

echo "🔍 Probando función de balance..."
node test-balance-function.js

BALANCE_TEST_RESULT=$?

echo ""
echo "2️⃣ Verificando y corrigiendo errores de Stellar..."

cd ../../

# Crear parche para stellar.ts
cat > stellar-fixes.patch << 'EOF'
--- a/apps/frontend/src/lib/stellar.ts
+++ b/apps/frontend/src/lib/stellar.ts
@@ -113,9 +113,15 @@ export class StellarService {
   static async submitTransaction(signedTransaction: any) {
     try {
       const result = await server.submitTransaction(signedTransaction);
       return result;
     } catch (error: any) {
-      console.error("Error submitting transaction:", error);
+      console.error("Error submitting transaction:", error);
+      
+      // Manejo mejorado de errores de Stellar
+      if (error && error.response && error.response.data) {
+        console.error("Stellar error details:", error.response.data);
+      }
+      
       throw new Error("Failed to submit transaction");
     }
   }
EOF

echo "📝 Aplicando correcciones a stellar.ts..."

# Hacer backup
cp apps/frontend/src/lib/stellar.ts apps/frontend/src/lib/stellar.ts.backup

# Aplicar manejo mejorado de errores
cat > apps/frontend/src/lib/stellar-fixed.ts << 'EOF'
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

  static async submitTransaction(signedTransaction: any) {
    try {
      console.log("🚀 Submitting transaction to Stellar network...");
      const result = await server.submitTransaction(signedTransaction);
      console.log("✅ Transaction submitted successfully:", result.hash);
      return result;
    } catch (error: any) {
      console.error("❌ Error submitting transaction:", error);
      
      // Manejo mejorado de errores
      let errorMessage = "Failed to submit transaction";
      
      if (error && error.response && error.response.data) {
        console.error("📊 Stellar error details:", error.response.data);
        
        // Extraer información específica del error
        if (error.response.data.extras) {
          const extras = error.response.data.extras;
          if (extras.result_codes) {
            errorMessage = `Transaction failed: ${extras.result_codes.transaction || extras.result_codes.operations?.join(', ')}`;
          }
        }
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
      const hash = require('crypto').createHash('sha256').update(seed).digest();
      const keypair = Keypair.fromRawEd25519Seed(hash.slice(0, 32));
      
      const publicKey = keypair.publicKey();
      console.log(`Generated group account: ${publicKey}`);
      
      // Verificar si la cuenta existe
      const exists = await this.accountExists(publicKey);
      if (!exists) {
        // Fondear la cuenta en testnet
        await this.fundTestnetAccount(publicKey);
      }
      
      return publicKey;
    } catch (error: any) {
      console.error("Error getting/creating group account:", error);
      throw error;
    }
  }

  static async fundTestnetAccount(publicKey: string) {
    try {
      const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
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

      return this.buildTransaction(sourcePublicKey, [trustlineOperation], "Create USDC trustline");
    } catch (error: any) {
      console.error("Error creating USDC trustline:", error);
      throw error;
    }
  }
}
EOF

# Reemplazar el archivo original
mv apps/frontend/src/lib/stellar-fixed.ts apps/frontend/src/lib/stellar.ts

echo "✅ Correcciones aplicadas a stellar.ts"

# Limpiar archivos temporales
rm -f apps/backend/test-balance-function.js
rm -f stellar-fixes.patch

echo ""
echo "🎉 CORRECCIONES COMPLETADAS"
echo ""

if [ $BALANCE_TEST_RESULT -eq 0 ]; then
    echo "✅ Función de balance: FUNCIONANDO"
else
    echo "⚠️  Función de balance: NECESITA ATENCIÓN"
fi

echo "✅ Manejo de errores Stellar: MEJORADO"
echo ""
echo "🚀 PRÓXIMOS PASOS:"
echo "   1. Reiniciar el frontend: cd apps/frontend && bun run dev"
echo "   2. Probar crear una contribución"
echo "   3. Verificar que los balances se calculen correctamente"
echo ""
echo "🔍 PARA VERIFICAR:"
echo "   • Los errores 500 de balance deben desaparecer"
echo "   • Los errores de transacciones Stellar deben ser más específicos"
echo "   • Las transacciones deben completarse exitosamente" 