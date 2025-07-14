import {
  Networks,
  Address,
  xdr,
  Keypair,
  TransactionBuilder,
  Account,
  Horizon,
  SorobanRpc,
} from "@stellar/stellar-sdk";
import {
  PoolContractV2,
  RequestType,
  Request,
  SubmitArgs,
  PoolV2,
  PoolOracle,
  PoolEstimate,
  PositionsEstimate,
  Network,
} from "@blend-capital/blend-sdk";

export interface BlendPoolConfig {
  poolAddress: string;
  network: string;
  horizonUrl: string;
  sorobanRpcUrl?: string; // Agregar URL específica para Soroban RPC
}

export interface BlendPosition {
  asset: string;
  balance: string;
  yield_earned: string;
}

export class BlendService {
  private sorobanServer: SorobanRpc.Server;
  private horizonServer: Horizon.Server;
  private network: Network;
  private poolAddress: string;
  private poolContract: PoolContractV2;

  constructor(config: BlendPoolConfig) {
    // Usar Soroban RPC para transacciones de contratos inteligentes
    const sorobanRpcUrl =
      config.sorobanRpcUrl || config.horizonUrl.replace("horizon", "soroban");
    this.sorobanServer = new SorobanRpc.Server(sorobanRpcUrl);

    // Mantener Horizon para operaciones básicas de cuentas
    this.horizonServer = new Horizon.Server(config.horizonUrl);

    this.network = {
      rpc: sorobanRpcUrl,
      passphrase:
        config.network === "testnet" ? Networks.TESTNET : Networks.PUBLIC,
      opts: { allowHttp: false },
    };
    this.poolAddress = config.poolAddress;
    this.poolContract = new PoolContractV2(config.poolAddress);
  }

  /**
   * Deposita fondos en el pool de Blend para generar rendimientos usando el SDK oficial
   */
  async depositToBlendPool(
    sourceKeypair: Keypair,
    assetAddress: string,
    amount: string
  ): Promise<string> {
    try {
      console.log(
        `🏦 Depositando ${amount} de asset ${assetAddress} en Blend pool usando SDK oficial...`
      );

      // Por ahora, simulamos la transacción para testing
      // TODO: Implementar transacción real una vez que tengamos los tipos correctos
      console.log(`📋 Parámetros de transacción:`);
      console.log(`- Source: ${sourceKeypair.publicKey()}`);
      console.log(`- Asset: ${assetAddress}`);
      console.log(`- Amount: ${amount}`);
      console.log(`- Pool: ${this.poolAddress}`);

      // Simular hash de transacción para testing
      const mockTransactionHash =
        "simulated_" + Math.random().toString(36).substring(7);

      console.log(`✅ Transacción simulada con hash: ${mockTransactionHash}`);
      return mockTransactionHash;
    } catch (error: any) {
      console.error("❌ Error depositando en Blend:", error);
      throw new Error(`Failed to deposit to Blend pool: ${error.message}`);
    }
  }

  /**
   * Retira fondos del pool de Blend usando el SDK oficial
   */
  async withdrawFromBlendPool(
    sourceKeypair: Keypair,
    assetAddress: string,
    amount: string
  ): Promise<string> {
    try {
      console.log(
        `🏧 Retirando ${amount} de asset ${assetAddress} de Blend pool...`
      );

      // Por ahora, simulamos la transacción para testing
      console.log(`📋 Parámetros de retiro:`);
      console.log(`- Source: ${sourceKeypair.publicKey()}`);
      console.log(`- Asset: ${assetAddress}`);
      console.log(`- Amount: ${amount}`);
      console.log(`- Pool: ${this.poolAddress}`);

      // Simular hash de transacción para testing
      const mockTransactionHash =
        "withdraw_" + Math.random().toString(36).substring(7);

      console.log(`✅ Retiro simulado con hash: ${mockTransactionHash}`);
      return mockTransactionHash;
    } catch (error: any) {
      console.error("❌ Error retirando de Blend:", error);
      throw new Error(`Failed to withdraw from Blend pool: ${error.message}`);
    }
  }

  /**
   * Obtiene las posiciones del grupo en Blend usando el SDK oficial
   */
  async getBlendPositions(groupPublicKey: string): Promise<BlendPosition[]> {
    try {
      console.log(
        `📊 Obteniendo posiciones de Blend para ${groupPublicKey}...`
      );

      // Cargar el pool usando el SDK oficial
      const pool = await PoolV2.load(this.network, this.poolAddress);

      // Cargar las posiciones del usuario
      const poolUser = await pool.loadUser(groupPublicKey);

      // Convertir a nuestro formato
      const positions: BlendPosition[] = [];

      if (poolUser.positions) {
        // Las posiciones usan índices numéricos, necesitamos mapearlos a assets
        for (const [
          reserveIndex,
          collateralAmount,
        ] of poolUser.positions.collateral.entries()) {
          if (collateralAmount > 0n) {
            // Buscar el asset correspondiente al índice
            let assetAddress = "";
            for (const [address, reserve] of pool.reserves.entries()) {
              if (reserve.config.index === reserveIndex) {
                assetAddress = address;
                break;
              }
            }

            if (assetAddress) {
              positions.push({
                asset: assetAddress,
                balance: collateralAmount.toString(),
                yield_earned: "0", // Requiere cálculo adicional
              });
            }
          }
        }

        // También revisar las posiciones de supply
        for (const [
          reserveIndex,
          supplyAmount,
        ] of poolUser.positions.supply.entries()) {
          if (supplyAmount > 0n) {
            // Buscar el asset correspondiente al índice
            let assetAddress = "";
            for (const [address, reserve] of pool.reserves.entries()) {
              if (reserve.config.index === reserveIndex) {
                assetAddress = address;
                break;
              }
            }

            if (assetAddress) {
              // Verificar si ya existe en la lista (de collateral)
              const existingPosition = positions.find(
                (p) => p.asset === assetAddress
              );
              if (existingPosition) {
                // Sumar al balance existente
                const totalBalance =
                  BigInt(existingPosition.balance) + supplyAmount;
                existingPosition.balance = totalBalance.toString();
              } else {
                positions.push({
                  asset: assetAddress,
                  balance: supplyAmount.toString(),
                  yield_earned: "0",
                });
              }
            }
          }
        }
      }

      console.log(`✅ Encontradas ${positions.length} posiciones en Blend`);
      return positions;
    } catch (error: any) {
      console.error("❌ Error obteniendo posiciones de Blend:", error);
      return [];
    }
  }

  /**
   * Calcula los rendimientos acumulados usando el SDK oficial
   */
  async calculateYieldEarned(
    groupPublicKey: string,
    assetAddress: string
  ): Promise<string> {
    try {
      // Cargar el pool y oracle
      const pool = await PoolV2.load(this.network, this.poolAddress);
      const poolOracle = await pool.loadOracle();

      // Cargar las posiciones del usuario
      const poolUser = await pool.loadUser(groupPublicKey);

      // Calcular estimaciones usando el SDK
      const userEstimates = PositionsEstimate.build(
        pool,
        poolOracle,
        poolUser.positions
      );

      // El yield earned se puede calcular basado en el tiempo y las tasas
      // Por ahora retornamos 0, pero se puede implementar lógica más compleja
      return "0";
    } catch (error: any) {
      console.error("❌ Error calculando rendimientos:", error);
      return "0";
    }
  }

  /**
   * Verifica si es momento de hacer auto-inversión (diariamente a las 12 PM)
   */
  static shouldAutoInvest(lastInvestmentDate?: string): boolean {
    const now = new Date();
    const currentHour = now.getHours();

    // Solo permitir inversión a las 12 PM (hora 12)
    if (currentHour !== 12) {
      return false;
    }

    if (!lastInvestmentDate) {
      return true; // Si nunca se ha invertido, permitir inversión
    }

    const lastInvestment = new Date(lastInvestmentDate);
    const lastInvestmentDay = lastInvestment.toDateString();
    const todayDay = now.toDateString();

    // Invertir solo una vez por día (si no se ha invertido hoy)
    return lastInvestmentDay !== todayDay;
  }

  /**
   * Obtiene el próximo momento de auto-inversión (mañana a las 12 PM si ya se invirtió hoy)
   */
  static getNextAutoInvestDate(lastInvestmentDate?: string): Date {
    const now = new Date();

    if (!lastInvestmentDate) {
      // Si nunca se ha invertido, la próxima es hoy a las 12 PM si aún no son las 12,
      // o mañana a las 12 PM si ya pasaron las 12
      const nextInvestment = new Date(now);
      nextInvestment.setHours(12, 0, 0, 0);

      if (now.getHours() >= 12) {
        nextInvestment.setDate(nextInvestment.getDate() + 1);
      }

      return nextInvestment;
    }

    // Si ya se invirtió, la próxima es mañana a las 12 PM
    const nextInvestment = new Date(now);
    nextInvestment.setDate(nextInvestment.getDate() + 1);
    nextInvestment.setHours(12, 0, 0, 0);

    return nextInvestment;
  }

  /**
   * Obtiene información del pool usando el SDK oficial
   */
  async getPoolInfo() {
    try {
      const pool = await PoolV2.load(this.network, this.poolAddress);
      const poolOracle = await pool.loadOracle();
      const poolEstimate = PoolEstimate.build(pool.reserves, poolOracle);

      return {
        pool,
        oracle: poolOracle,
        estimates: poolEstimate,
      };
    } catch (error: any) {
      console.error("❌ Error obteniendo información del pool:", error);
      throw new Error(`Failed to get pool info: ${error.message}`);
    }
  }
}

// Configuración por defecto para testnet usando direcciones reales de Blend
export const DEFAULT_BLEND_CONFIG: BlendPoolConfig = {
  poolAddress:
    process.env.BLEND_POOL_ADDRESS ||
    "CCLBPEYS3XFK65MYYXSBMOGKUI4ODN5S7SUZBGD7NALUQF64QILLX5B5", // TestnetV2 pool real
  network: "testnet",
  horizonUrl: "https://horizon-testnet.stellar.org",
  sorobanRpcUrl: "https://soroban-testnet.stellar.org", // Soroban RPC para contratos
};
