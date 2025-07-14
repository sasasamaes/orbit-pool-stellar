import cron from "node-cron";
import { StellarService } from "../services/stellar-service";
import { BlendService } from "../services/blend-service";
import { ContractService } from "../services/contract-service";
import { createClient } from "@supabase/supabase-js";
import { Keypair } from "@stellar/stellar-sdk";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Job que ejecuta auto-inversión en Blend diariamente a las 12:00 PM
 * ACTUALIZADO: Usa ContractService como prioridad y StellarService como fallback
 */
export class AutoInvestJob {
  private static isRunning = false;

  /**
   * Inicializa el job programado
   */
  static start() {
    console.log("🤖 Inicializando Auto-Invest Job...");

    // Ejecutar diariamente a las 12:00 PM (actualizado para coincidir con BlendService)
    cron.schedule("0 12 * * *", async () => {
      await this.executeAutoInvestment();
    });

    console.log("✅ Auto-Invest Job programado para cada día a las 12:00 PM");
  }

  /**
   * Ejecuta la auto-inversión para todos los grupos elegibles
   */
  static async executeAutoInvestment() {
    if (this.isRunning) {
      console.log("⏳ Auto-inversión ya en proceso, saltando ejecución");
      return;
    }

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
        contractInvestments: 0,
        stellarFallbacks: 0,
      };

      // Procesar cada grupo
      for (const groupSetting of eligibleGroups) {
        try {
          // Verificar si este grupo específico debe invertir (usando la fecha del setting)
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

          const result = await this.processGroupAutoInvestment(
            groupSetting.group_id,
            groupSetting.min_amount_to_invest || 100
          );

          if (result.success) {
            console.log(
              `✅ Auto-inversión exitosa para grupo ${groupSetting.groups.name}: $${result.amountInvested} via ${result.method}`
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
                investment_method: result.method,
                via_contract: result.method === "contract",
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

            // Contar método usado
            if (result.method === "contract") {
              results.contractInvestments++;
            } else {
              results.stellarFallbacks++;
            }
          } else {
            console.log(
              `⚠️ Auto-inversión no ejecutada para grupo ${groupSetting.groups.name}: ${result.error}`
            );
            results.failed++;
            results.errors.push(`${groupSetting.groups.name}: ${result.error}`);
          }

          // Pausa entre grupos para no sobrecargar
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error: any) {
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
        inversionesContrato: results.contractInvestments,
        fallbacksStellar: results.stellarFallbacks,
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
          contract_investments: results.contractInvestments,
          stellar_fallbacks: results.stellarFallbacks,
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
   * Procesa la auto-inversión para un grupo específico
   * PRIORIDAD 1: ContractService (contrato inteligente)
   * FALLBACK: StellarService (método anterior)
   */
  private static async processGroupAutoInvestment(
    groupId: string,
    minAmountToInvest: number
  ): Promise<{
    success: boolean;
    transactionHash?: string;
    amountInvested?: number;
    error?: string;
    method?: "contract" | "stellar";
  }> {
    try {
      console.log(`🤖 Iniciando auto-inversión para grupo ${groupId}...`);

      // Obtener keypair del grupo
      const groupKeypair =
        await StellarService.getOrCreateGroupAccount(groupId);

      // Verificar balance disponible antes de intentar inversión
      const stellarService = new StellarService();
      const hasBalance = await this.checkGroupBalance(
        groupId,
        minAmountToInvest
      );

      if (!hasBalance.sufficient) {
        return {
          success: false,
          error: hasBalance.reason,
        };
      }

      // OPCIÓN 1: Intentar usar el contrato inteligente primero
      try {
        console.log(`🏛️ Intentando auto-inversión via contrato inteligente...`);

        const contractService = new ContractService();
        const USDC_CONTRACT =
          "CAQCFVLOBK5GIULPNZRGATJJMIZL5BSP7X5YJVMGCPTUEPFM4AVSRCJU";

        const transactionHash = await contractService.manualInvestToBlend(
          groupKeypair,
          groupId,
          hasBalance.investableAmount,
          USDC_CONTRACT
        );

        console.log(
          `✅ Auto-inversión exitosa via contrato: $${hasBalance.investableAmount}`
        );

        return {
          success: true,
          transactionHash,
          amountInvested: hasBalance.investableAmount,
          method: "contract",
        };
      } catch (contractError: any) {
        console.log(
          `⚠️ Contrato falló, usando fallback de StellarService:`,
          contractError.message
        );

        // OPCIÓN 2: Fallback usando StellarService
        try {
          console.log(`🔄 Intentando auto-inversión via StellarService...`);

          const result = await StellarService.manualInvestInBlend(
            groupId,
            hasBalance.investableAmount,
            "auto-invest-job" // Sistema automático
          );

          if (result.success) {
            console.log(
              `✅ Auto-inversión exitosa via Stellar fallback: $${result.amountInvested}`
            );

            return {
              success: true,
              transactionHash: result.transactionHash,
              amountInvested: result.amountInvested,
              method: "stellar",
            };
          } else {
            return {
              success: false,
              error: `Ambos métodos fallaron. Contrato: ${contractError.message}, Stellar: ${result.error}`,
            };
          }
        } catch (stellarError: any) {
          return {
            success: false,
            error: `Ambos métodos fallaron. Contrato: ${contractError.message}, Stellar: ${stellarError.message}`,
          };
        }
      }
    } catch (error: any) {
      console.error(`❌ Error en auto-inversión para grupo ${groupId}:`, error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Verifica si el grupo tiene suficiente balance para invertir
   */
  private static async checkGroupBalance(
    groupId: string,
    minAmountToInvest: number
  ): Promise<{
    sufficient: boolean;
    investableAmount: number;
    reason?: string;
  }> {
    try {
      const groupKeypair =
        await StellarService.getOrCreateGroupAccount(groupId);
      const stellarService = new StellarService();

      // Verificar si la cuenta existe
      const accountExists = await stellarService.accountExists(
        groupKeypair.publicKey()
      );
      if (!accountExists) {
        return {
          sufficient: false,
          investableAmount: 0,
          reason: "Cuenta del grupo no está activa en Stellar",
        };
      }

      // Obtener balance USDC
      const usdcBalance = await stellarService.getUSDCBalance(
        groupKeypair.publicKey()
      );

      // Reservar fondos para fees y operaciones
      const reserveForFees = 10;
      const investableAmount = usdcBalance - reserveForFees;

      if (investableAmount < minAmountToInvest) {
        return {
          sufficient: false,
          investableAmount: 0,
          reason: `Balance insuficiente para auto-inversión. Disponible: $${investableAmount.toFixed(2)}, Mínimo: $${minAmountToInvest}`,
        };
      }

      return {
        sufficient: true,
        investableAmount: Math.floor(investableAmount), // Redondear hacia abajo para evitar problemas de precisión
      };
    } catch (error: any) {
      return {
        sufficient: false,
        investableAmount: 0,
        reason: `Error verificando balance: ${error.message}`,
      };
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
