#!/usr/bin/env node

/**
 * Fix Group Trustlines - Corrige las cuentas de grupo existentes
 * Añade trustlines USDC a las cuentas de grupo que no las tienen
 */

const {
  Keypair,
  Asset,
  TransactionBuilder,
  Operation,
  Networks,
  Horizon,
} = require("@stellar/stellar-sdk");
const crypto = require("crypto");

const HORIZON_URL = "https://horizon-testnet.stellar.org";
const USDC_ISSUER = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";
const server = new Horizon.Server(HORIZON_URL);
const USDC_ASSET = new Asset("USDC", USDC_ISSUER);

async function generateGroupKeypair(groupId) {
  const seed = `group-${groupId}`;
  const hash = crypto.createHash("sha256").update(seed).digest();
  return Keypair.fromRawEd25519Seed(hash.slice(0, 32));
}

async function checkUSDCTrustline(publicKey) {
  try {
    const account = await server.loadAccount(publicKey);
    return account.balances.some(
      (balance) =>
        balance.asset_code === "USDC" && balance.asset_issuer === USDC_ISSUER
    );
  } catch (error) {
    console.error(`Error checking trustline for ${publicKey}:`, error.message);
    return false;
  }
}

async function createUSDCTrustline(keypair) {
  try {
    console.log(`🔐 Creating USDC trustline for: ${keypair.publicKey()}`);

    // Load account
    const account = await server.loadAccount(keypair.publicKey());

    // Build transaction
    const transaction = new TransactionBuilder(account, {
      fee: "100000",
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.changeTrust({
          asset: USDC_ASSET,
        })
      )
      .setTimeout(60)
      .build();

    // Sign and submit
    transaction.sign(keypair);
    const result = await server.submitTransaction(transaction);

    console.log(`✅ Trustline created successfully: ${result.hash}`);
    return result;
  } catch (error) {
    console.error(`❌ Error creating trustline:`, error);
    if (error.response && error.response.data) {
      console.error("Error details:", error.response.data);
    }
    throw error;
  }
}

async function fixGroupAccount(groupId) {
  console.log(`\n🔧 Fixing group account for: ${groupId}`);

  try {
    // Generate keypair
    const keypair = await generateGroupKeypair(groupId);
    const publicKey = keypair.publicKey();

    console.log(`📋 Group account: ${publicKey}`);

    // Check if trustline exists
    const hasTrustline = await checkUSDCTrustline(publicKey);

    if (hasTrustline) {
      console.log(`✅ Already has USDC trustline`);
      return { success: true, alreadyExists: true };
    }

    // Create trustline
    const result = await createUSDCTrustline(keypair);

    // Wait a moment and verify
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const verifyTrustline = await checkUSDCTrustline(publicKey);

    if (verifyTrustline) {
      console.log(`✅ Trustline verified successfully`);
      return { success: true, created: true, hash: result.hash };
    } else {
      console.log(`❌ Trustline creation failed`);
      return { success: false };
    }
  } catch (error) {
    console.error(`❌ Failed to fix group ${groupId}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log("🚀 Fix Group Trustlines Tool\n");

  // IDs de grupos conocidos desde los logs
  const groupIds = [
    "7697284f-4eb2-4598-826f-6874038197f5", // Grupo principal
    // Agregar más IDs según sea necesario
  ];

  console.log(`📋 Groups to fix: ${groupIds.length}`);

  const results = [];

  for (const groupId of groupIds) {
    const result = await fixGroupAccount(groupId);
    results.push({ groupId, ...result });
  }

  console.log("\n📊 SUMMARY:");
  console.log("─".repeat(50));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  const alreadyExisting = results.filter((r) => r.alreadyExists);
  const created = results.filter((r) => r.created);

  console.log(`✅ Successful: ${successful.length}`);
  console.log(`🔄 Already had trustline: ${alreadyExisting.length}`);
  console.log(`🆕 Created trustlines: ${created.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (created.length > 0) {
    console.log("\n🎉 Created trustlines:");
    created.forEach((r) => {
      console.log(`  - ${r.groupId}: ${r.hash}`);
    });
  }

  if (failed.length > 0) {
    console.log("\n❌ Failed accounts:");
    failed.forEach((r) => {
      console.log(`  - ${r.groupId}: ${r.error}`);
    });
  }

  console.log(
    "\n🌟 All group accounts should now be ready for USDC transactions!"
  );
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fixGroupAccount, generateGroupKeypair, createUSDCTrustline };
