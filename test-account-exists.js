require("dotenv").config({ path: "./apps/backend/.env" });
const crypto = require("crypto");
const { Keypair, Horizon } = require("@stellar/stellar-sdk");

// Configuración igual que el backend
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Función para generar dirección de grupo (igual que el backend)
function getGroupStellarAddress(groupId) {
  const seed = crypto
    .createHash("sha256")
    .update(`group_${groupId}_stellar_account`)
    .digest();

  const keypair = Keypair.fromRawEd25519Seed(seed);
  return keypair.publicKey();
}

// Función para verificar si una cuenta existe (igual que el backend)
async function accountExists(publicKey) {
  try {
    console.log(`🔍 Verificando cuenta: ${publicKey}`);
    const account = await server.loadAccount(publicKey);
    console.log(
      `✅ Cuenta encontrada! Balance XLM: ${account.balances.find((b) => b.asset_type === "native")?.balance || "0"}`
    );

    // Verificar USDC
    const usdcBalance = account.balances.find(
      (b) =>
        b.asset_code === "USDC" &&
        b.asset_issuer ===
          "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"
    );

    if (usdcBalance) {
      console.log(`💰 Balance USDC: ${usdcBalance.balance}`);
    } else {
      console.log(`⚠️  No se encontró balance USDC`);
    }

    return true;
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  const groups = [
    { id: "42e71fe9-215a-4bb3-ae5b-5eda142b4346", name: "Grupo 345" },
    { id: "fc5bb78d-dabd-4786-b96e-c9aa2434dcc9", name: "Grupo 123" },
    { id: "39733263-7b0d-4208-9da8-12f2fe7bb670", name: "Grupo es" },
  ];

  console.log("🚀 Probando verificación de cuentas Stellar...\n");

  for (const group of groups) {
    console.log(`=== ${group.name} ===`);
    const address = getGroupStellarAddress(group.id);
    const exists = await accountExists(address);
    console.log(`Resultado: ${exists ? "✅ EXISTE" : "❌ NO EXISTE"}\n`);
  }

  // También probar la cuenta que mencionaste con $600
  console.log("=== Cuenta con $600 ===");
  await accountExists(
    "GCBJUGK7PVCH6CUGM2HPXS6Z7OAVEQ4UD3R4ZPXORWOCZANYOGSMW5AG"
  );
}

main().catch(console.error);
