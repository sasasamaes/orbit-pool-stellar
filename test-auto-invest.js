#!/usr/bin/env node

/**
 * Script de prueba para verificar el auto-invest-job arreglado
 */

const { AutoInvestJob } = require("./apps/backend/src/jobs/auto-invest-job.ts");

async function testAutoInvestJob() {
  console.log("🧪 Probando Auto-Invest Job arreglado...");

  try {
    console.log("📊 Obteniendo estadísticas del último job...");
    const lastStats = await AutoInvestJob.getLastJobStats();

    if (lastStats) {
      console.log("✅ Última ejecución encontrada:", {
        fecha: lastStats.execution_date,
        grupos_procesados: lastStats.groups_processed,
        inversiones_exitosas: lastStats.successful_investments,
        inversiones_fallidas: lastStats.failed_investments,
        total_invertido: `$${lastStats.total_amount_invested}`,
        metadatos: lastStats.metadata,
      });
    } else {
      console.log("📭 No se encontraron ejecuciones previas del job");
    }

    console.log("\n🔧 Ejecutando prueba manual del job...");
    await AutoInvestJob.executeManual();

    console.log("\n✅ Prueba completada exitosamente");
  } catch (error) {
    console.error("❌ Error en la prueba:", error);
  }
}

// Ejecutar la prueba
testAutoInvestJob()
  .then(() => {
    console.log("🏁 Prueba finalizada");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Error crítico:", error);
    process.exit(1);
  });
