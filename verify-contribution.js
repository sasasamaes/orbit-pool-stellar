const { Horizon, Keypair } = require("@stellar/stellar-sdk");
const crypto = require("crypto");

const groupId = "42e71fe9-215a-4bb3-ae5b-5eda142b4346";

function getGroupAccount(groupId) {
  if (groupId === "42e71fe9-215a-4bb3-ae5b-5eda142b4346") {
    const seed = crypto
      .createHash("sha256")
      .update("test_account_for_demo_purposes_only")
      .digest();
    const keypair = Keypair.fromRawEd25519Seed(seed);
    return keypair;
  }

  const seed = crypto
    .createHash("sha256")
    .update(`group_${groupId}_stellar_account`)
    .digest();

  const keypair = Keypair.fromRawEd25519Seed(seed);
  return keypair;
}

async function verifyContribution() {
  try {
    console.log("🔍 Verificando si la contribución inicial fue exitosa...");
    console.log(`📝 Group ID: ${groupId}`);

    const horizon = new Horizon.Server("https://horizon-testnet.stellar.org");
    const groupKeypair = getGroupAccount(groupId);
    const groupPublicKey = groupKeypair.publicKey();

    console.log(`🔑 Dirección Stellar del grupo: ${groupPublicKey}`);

    try {
      const account = await horizon.loadAccount(groupPublicKey);
      console.log("✅ ¡ÉXITO! La cuenta del grupo EXISTE en Stellar testnet");
      console.log(`📊 Sequence Number: ${account.sequenceNumber()}`);

      // Verificar balance USDC
      const usdcBalance = account.balances.find(
        (balance) =>
          balance.asset_code === "USDC" &&
          balance.asset_issuer ===
            "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"
      );

      if (usdcBalance) {
        const usdcAmount = parseFloat(usdcBalance.balance);
        console.log(`💵 Balance USDC: ${usdcAmount} USDC`);

        if (usdcAmount >= 10) {
          console.log(
            "✅ ¡Perfecto! La cuenta tiene suficiente USDC para inversión manual en Blend"
          );
          console.log(
            "🚀 Ahora puedes intentar la inversión manual en Blend de nuevo"
          );
        } else {
          console.log(
            "⚠️ La cuenta necesita más USDC para inversión (mínimo $10)"
          );
        }
      } else {
        console.log(
          "⚠️ La cuenta no tiene balance USDC aún - verifica la contribución"
        );
      }

      // Mostrar todos los balances
      console.log(`💰 Todos los balances:`);
      account.balances.forEach((balance, index) => {
        if (balance.asset_type === "native") {
          console.log(`  ${index + 1}. XLM: ${balance.balance}`);
        } else {
          console.log(
            `  ${index + 1}. ${balance.asset_code}: ${balance.balance}`
          );
        }
      });
    } catch (accountError) {
      if (accountError.name === "NotFoundError") {
        console.log("❌ La cuenta del grupo AÚN NO EXISTE");
        console.log(
          "🔧 Necesitas hacer la contribución inicial desde el frontend"
        );
        console.log(
          "🌐 Ve a: http://localhost:3000/groups/42e71fe9-215a-4bb3-ae5b-5eda142b4346"
        );
      } else {
        console.log("❌ Error verificando cuenta:", accountError.message);
      }
    }
  } catch (error) {
    console.error("❌ Error en verificación:", error);
  }
}

verifyContribution();
