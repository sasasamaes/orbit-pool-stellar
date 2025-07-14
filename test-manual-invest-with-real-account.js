require("dotenv").config({ path: "./apps/backend/.env" });
const crypto = require("crypto");
const { Keypair, Horizon, Asset } = require("@stellar/stellar-sdk");

// Configuración igual que el backend
const server = new Horizon.Server("https://horizon-testnet.stellar.org");
const USDC_ASSET = new Asset(
  "USDC",
  "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"
);

async function testManualInvestLogic(accountAddress, amountToInvest) {
  try {
    console.log(`🪙 Iniciando prueba de inversión manual...`);
    console.log(`💰 Cantidad solicitada: $${amountToInvest}`);
    console.log(`🏦 Cuenta: ${accountAddress}\n`);

    // Paso 1: Verificar que la cuenta existe
    console.log("PASO 1: Verificar existencia de cuenta...");
    try {
      const account = await server.loadAccount(accountAddress);
      console.log("✅ Cuenta encontrada");
    } catch (error) {
      console.log("❌ Cuenta no existe");
      return { success: false, error: "Cuenta no activa" };
    }

    // Paso 2: Verificar balance USDC
    console.log("\nPASO 2: Verificar balance USDC...");
    const accountInfo = await server.loadAccount(accountAddress);
    const usdcBalance = accountInfo.balances.find(
      (balance) =>
        balance.asset_code === "USDC" &&
        balance.asset_issuer === USDC_ASSET.getIssuer()
    );

    if (!usdcBalance) {
      console.log("❌ No se encontró balance USDC");
      return { success: false, error: "No tiene trustline USDC" };
    }

    const availableBalance = parseFloat(usdcBalance.balance);
    console.log(`✅ Balance USDC disponible: $${availableBalance}`);

    // Paso 3: Verificar si hay suficiente para la cantidad solicitada
    console.log("\nPASO 3: Verificar fondos suficientes...");
    const reserveForFees = 5; // Reservar $5 para fees
    const maxInvestable = availableBalance - reserveForFees;

    console.log(
      `💡 Máximo invertible: $${maxInvestable.toFixed(2)} (reservando $${reserveForFees} para fees)`
    );

    if (amountToInvest > maxInvestable) {
      console.log(
        `❌ Fondos insuficientes. Solicitado: $${amountToInvest}, Disponible: $${maxInvestable.toFixed(2)}`
      );
      return {
        success: false,
        error: `Balance insuficiente. Disponible: $${maxInvestable.toFixed(2)}, Solicitado: $${amountToInvest}`,
      };
    }

    console.log(`✅ Fondos suficientes para invertir $${amountToInvest}`);

    // Paso 4: Simular inversión en Blend
    console.log("\nPASO 4: Simular inversión en Blend...");
    console.log("🔄 Convirtiendo a stroops...");
    const amountInStroops = Math.floor(amountToInvest * 10000000).toString();
    console.log(`📊 Cantidad en stroops: ${amountInStroops}`);

    console.log("🏦 Depositando en Blend pool (simulado)...");
    // Aquí normalmente llamaríamos a BlendService.depositToBlendPool()
    const simulatedTxHash = `simulated_${Date.now()}`;

    console.log(`✅ Inversión manual simulada exitosamente!`);
    console.log(`📝 Transaction hash (simulado): ${simulatedTxHash}`);

    return {
      success: true,
      transactionHash: simulatedTxHash,
      amountInvested: amountToInvest,
    };
  } catch (error) {
    console.error("\n❌ Error en prueba de inversión manual:", error.message);
    return {
      success: false,
      error: `Error: ${error.message}`,
    };
  }
}

async function main() {
  console.log("🧪 PRUEBA DE LÓGICA DE INVERSIÓN MANUAL\n");

  // Usar la cuenta real que tiene $605 USDC
  const realAccount =
    "GCBJUGK7PVCH6CUGM2HPXS6Z7OAVEQ4UD3R4ZPXORWOCZANYOGSMW5AG";

  // Probar diferentes cantidades
  const testAmounts = [50, 100, 500, 650]; // $650 debería fallar

  for (const amount of testAmounts) {
    console.log("=".repeat(60));
    console.log(`PRUEBA: Inversión de $${amount}`);
    console.log("=".repeat(60));

    const result = await testManualInvestLogic(realAccount, amount);

    console.log("\n📊 RESULTADO:");
    console.log(`Success: ${result.success}`);
    if (result.success) {
      console.log(`Amount Invested: $${result.amountInvested}`);
      console.log(`Transaction Hash: ${result.transactionHash}`);
    } else {
      console.log(`Error: ${result.error}`);
    }

    console.log("\n\n");
  }
}

main().catch(console.error);
