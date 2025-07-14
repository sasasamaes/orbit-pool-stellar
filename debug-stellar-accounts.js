#!/usr/bin/env node

/**
 * Debug Stellar Accounts - Diagnóstico de cuentas Stellar
 * Verifica el estado de las cuentas involucradas en las transacciones
 */

const fetch = require("node-fetch").default || require("node-fetch");

const HORIZON_URL = "https://horizon-testnet.stellar.org";
const USDC_ISSUER = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";

async function checkAccount(publicKey, label) {
  console.log(`\n🔍 Checking ${label}: ${publicKey}`);

  try {
    const response = await fetch(`${HORIZON_URL}/accounts/${publicKey}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`❌ Account ${label} does NOT exist on Stellar testnet`);
        return { exists: false };
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const account = await response.json();
    console.log(`✅ Account ${label} exists`);

    // Check balances
    console.log(`💰 Balances for ${label}:`);
    account.balances.forEach((balance) => {
      if (balance.asset_type === "native") {
        console.log(`  - XLM: ${balance.balance}`);
      } else if (
        balance.asset_code === "USDC" &&
        balance.asset_issuer === USDC_ISSUER
      ) {
        console.log(`  - USDC: ${balance.balance} (Trustline: ✅)`);
      }
    });

    // Check if USDC trustline exists
    const usdcTrustline = account.balances.find(
      (b) => b.asset_code === "USDC" && b.asset_issuer === USDC_ISSUER
    );

    if (!usdcTrustline) {
      console.log(`❌ USDC trustline NOT found for ${label}`);
    }

    // Check sequence number
    console.log(`📊 Sequence: ${account.sequence}`);

    return {
      exists: true,
      hasUSDCTrustline: !!usdcTrustline,
      xlmBalance: parseFloat(
        account.balances.find((b) => b.asset_type === "native")?.balance || "0"
      ),
      usdcBalance: parseFloat(usdcTrustline?.balance || "0"),
      sequence: account.sequence,
    };
  } catch (error) {
    console.log(`❌ Error checking ${label}:`, error.message);
    return { exists: false, error: error.message };
  }
}

async function generateGroupAccount(groupId) {
  const crypto = require("crypto");
  const { Keypair } = require("@stellar/stellar-sdk");

  const seed = `group-${groupId}`;
  const hash = crypto.createHash("sha256").update(seed).digest();
  const keypair = Keypair.fromRawEd25519Seed(hash.slice(0, 32));

  return keypair.publicKey();
}

async function fundTestnetAccount(publicKey) {
  console.log(`💰 Attempting to fund account: ${publicKey}`);

  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${publicKey}`
    );

    if (response.ok) {
      console.log(`✅ Account funded successfully`);
      return true;
    } else {
      console.log(
        `❌ Failed to fund account: ${response.status} ${response.statusText}`
      );
      return false;
    }
  } catch (error) {
    console.log(`❌ Error funding account:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🚀 Stellar Accounts Debug Tool\n");

  // Cuentas desde los logs
  const sourceAccount =
    "GDKI2YBPVPZDTGBLQY7ZEDWGKM5SYY5FH7F4K46FGHCXMHV3F3VYQTIQ";
  const groupAccount =
    "GBZMDFCV2QVVNXE65ZLDDOORWDSWSP542WBDPDQJ2NQGVTGQW4UKQTBG";

  // También generar cuenta para un grupo de ejemplo
  const exampleGroupId = "7697284f-4eb2-4598-826f-6874038197f5";
  const generatedGroupAccount = await generateGroupAccount(exampleGroupId);

  console.log("📋 Accounts to check:");
  console.log(`Source (User): ${sourceAccount}`);
  console.log(`Group: ${groupAccount}`);
  console.log(`Generated Group: ${generatedGroupAccount}`);

  // Verificar todas las cuentas
  const sourceResult = await checkAccount(sourceAccount, "Source Account");
  const groupResult = await checkAccount(groupAccount, "Group Account");
  const generatedResult = await checkAccount(
    generatedGroupAccount,
    "Generated Group Account"
  );

  console.log("\n📊 SUMMARY:");
  console.log("─".repeat(50));

  // Source account analysis
  if (sourceResult.exists) {
    console.log(`✅ Source account exists with ${sourceResult.xlmBalance} XLM`);
    if (sourceResult.hasUSDCTrustline) {
      console.log(
        `✅ Source has USDC trustline with ${sourceResult.usdcBalance} USDC`
      );
    } else {
      console.log(`❌ Source missing USDC trustline`);
    }
  } else {
    console.log(`❌ Source account does not exist`);
  }

  // Group account analysis
  if (!groupResult.exists) {
    console.log(`❌ Group account does not exist - THIS IS LIKELY THE ISSUE`);
    console.log(`💡 Solution: Fund the group account first`);

    // Attempt to fund it
    await fundTestnetAccount(groupAccount);

    // Check again
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const refundedResult = await checkAccount(
      groupAccount,
      "Refunded Group Account"
    );

    if (refundedResult.exists && !refundedResult.hasUSDCTrustline) {
      console.log(`❌ Group account exists but has no USDC trustline`);
      console.log(`💡 Solution: Create USDC trustline for group account`);
    }
  } else {
    console.log(`✅ Group account exists`);
    if (!groupResult.hasUSDCTrustline) {
      console.log(`❌ Group account missing USDC trustline`);
    }
  }

  console.log("\n🔧 NEXT STEPS:");
  if (!sourceResult.exists) {
    console.log("1. Fund your source account with XLM");
  }
  if (sourceResult.exists && !sourceResult.hasUSDCTrustline) {
    console.log("2. Create USDC trustline for your wallet");
  }
  if (!groupResult.exists) {
    console.log(
      "3. Fund the group account automatically (should happen in app)"
    );
  }
  if (groupResult.exists && !groupResult.hasUSDCTrustline) {
    console.log("4. Create USDC trustline for group account");
  }

  console.log(
    "\n🌟 Recommended: Try the transaction again after fixing the issues above"
  );
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkAccount, generateGroupAccount, fundTestnetAccount };
