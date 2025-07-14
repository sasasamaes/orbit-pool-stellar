import cron from "node-cron";
import { StellarService } from "../services/stellar-service";
import { BlendService } from "../services/blend-service";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Job que ejecuta auto-inversión en Blend cada día 3 del mes a las 10:00 AM
 */
export class AutoInvestJob {
  private static isRunning = false;

  /**
   * Inicializa el job programado
   */
  static start() {
    console.log("🤖 Inicializando Auto-Invest Job...");

    // Ejecutar cada día 3 del mes a las 10:00 AM
    cron.schedule("0 10 3 * *", async () => {
      await this.executeAutoInvestment();
    });

    console.log(
      "✅ Auto-Invest Job programado para día 3 de cada mes a las 10:00 AM"
    );
  }

  /**
   * Ejecuta la auto-inversión para todos los grupos elegibles
   */
  static async executeAutoInvestment() {
    if (this.isRunning) {
      console.log("⏳ Auto-inversión ya en proceso, saltando ejecución");
      return;
    }

    // La verificación de si debe invertir se hace por grupo individualmente
    // ya que ahora es diariamente a las 12 PM (solo una vez por día por grupo)

    this.isRunning = true;
    console.log("🚀 Iniciando proceso de auto-inversión programada...");

    try {
      // Obtener todos los grupos con auto-inversión habilitada
      const { data: eligibleGroups, error } = await supabase
        .from("group_blend_settings")
        .select(
          `
          *,
          groups!inner(id, name, status)
        `
        )
        .eq("auto_invest_enabled", true)
        .eq("groups.status", "active");

      if (error) {
        console.error("❌ Error obteniendo grupos elegibles:", error);
        return;
      }

      if (!eligibleGroups || eligibleGroups.length === 0) {
        console.log("📭 No hay grupos elegibles para auto-inversión");
        return;
      }

      console.log(`📊 Procesando ${eligibleGroups.length} grupos elegibles...`);

      const results = {
        successful: 0,
        failed: 0,
        totalInvested: 0,
        errors: [] as string[],
      };

      // Procesar cada grupo
      for (const groupSetting of eligibleGroups) {
        try {
          // Verificar si este grupo específico debe invertir (diariamente a las 12 PM)
          const shouldInvest = BlendService.shouldAutoInvest(
            groupSetting.last_investment_date
          );

          if (!shouldInvest) {
            console.log(
              `⏭️ Grupo ${groupSetting.groups.name}: ya se invirtió hoy o no es hora de inversión (12 PM)`
            );
            continue;
          }

          console.log(
            `💰 Procesando grupo: ${groupSetting.groups.name} (${groupSetting.group_id})`
          );

          const result = await StellarService.autoInvestInBlend(
            groupSetting.group_id,
            groupSetting.min_amount_to_invest || 100
          );

          if (result.success) {
            console.log(
              `✅ Auto-inversión exitosa para grupo ${groupSetting.groups.name}: $${result.amountInvested}`
            );

            // Registrar en base de datos
            await supabase.from("group_blend_investments").insert({
              group_id: groupSetting.group_id,
              amount_invested: result.amountInvested,
              transaction_hash: result.transactionHash,
              investment_date: new Date().toISOString(),
              triggered_by: null, // Sistema automático
              metadata: {
                auto_job: true,
                job_execution_time: new Date().toISOString(),
              },
            });

            // Actualizar estadísticas del grupo
            await supabase
              .from("group_blend_settings")
              .update({
                total_invested:
                  groupSetting.total_invested + (result.amountInvested || 0),
                last_investment_date: new Date().toISOString(),
              })
              .eq("group_id", groupSetting.group_id);

            results.successful++;
            results.totalInvested += result.amountInvested || 0;
          } else {
            console.log(
              `⚠️ Auto-inversión no ejecutada para grupo ${groupSetting.groups.name}: ${result.error}`
            );
            results.failed++;
            results.errors.push(`${groupSetting.groups.name}: ${result.error}`);
          }

          // Pausa entre grupos para no sobrecargar
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(
            `❌ Error procesando grupo ${groupSetting.group_id}:`,
            error
          );
          results.failed++;
          results.errors.push(`${groupSetting.groups.name}: ${error.message}`);
        }
      }

      // Registrar resumen de ejecución
      console.log("📈 Resumen de auto-inversión:", {
        gruposProcesados: eligibleGroups.length,
        exitosos: results.successful,
        fallidos: results.failed,
        totalInvertido: `$${results.totalInvested.toFixed(2)}`,
        errores: results.errors,
      });

      // Guardar log de ejecución
      await supabase.from("auto_invest_logs").insert({
        execution_date: new Date().toISOString(),
        groups_processed: eligibleGroups.length,
        successful_investments: results.successful,
        failed_investments: results.failed,
        total_amount_invested: results.totalInvested,
        errors: results.errors,
        metadata: {
          duration_ms: Date.now(),
        },
      });
    } catch (error) {
      console.error("❌ Error crítico en auto-inversión:", error);
    } finally {
      this.isRunning = false;
      console.log("🏁 Proceso de auto-inversión completado");
    }
  }

  /**
   * Ejecuta manualmente la auto-inversión (para testing)
   */
  static async executeManual() {
    console.log("🔧 Ejecutando auto-inversión manual...");
    await this.executeAutoInvestment();
  }

  /**
   * Obtiene estadísticas del último job ejecutado
   */
  static async getLastJobStats() {
    try {
      const { data: lastLog } = await supabase
        .from("auto_invest_logs")
        .select("*")
        .order("execution_date", { ascending: false })
        .limit(1)
        .single();

      return lastLog;
    } catch (error) {
      console.error("Error obteniendo estadísticas del job:", error);
      return null;
    }
  }
}

// Inicializar el job si no estamos en modo test
if (process.env.NODE_ENV !== "test") {
  AutoInvestJob.start();
}
