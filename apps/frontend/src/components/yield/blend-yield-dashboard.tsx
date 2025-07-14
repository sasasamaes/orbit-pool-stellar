"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ApiClient } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Loader2,
  ExternalLink,
  Zap,
  Target,
  PiggyBank,
  Coins,
} from "lucide-react";

interface BlendYieldInfo {
  totalInvested: number;
  currentValue: number;
  yieldEarned: number;
  yieldPercentage: number;
}

interface BlendInvestment {
  id: string;
  amount_invested: number;
  transaction_hash: string;
  investment_date: string;
  triggered_by: string;
}

interface BlendWithdrawal {
  id: string;
  amount_withdrawn: number;
  transaction_hash: string;
  withdrawal_date: string;
  reason: string;
  triggered_by: string;
}

interface BlendYieldDashboardProps {
  groupId: string;
  isAdmin: boolean;
}

export function BlendYieldDashboard({
  groupId,
  isAdmin,
}: BlendYieldDashboardProps) {
  const [yieldInfo, setYieldInfo] = useState<BlendYieldInfo | null>(null);
  const [investments, setInvestments] = useState<BlendInvestment[]>([]);
  const [withdrawals, setWithdrawals] = useState<BlendWithdrawal[]>([]);
  const [nextAutoInvestDate, setNextAutoInvestDate] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoInvesting, setIsAutoInvesting] = useState(false);
  const [isManualInvesting, setIsManualInvesting] = useState(false);
  const [minAmount, setMinAmount] = useState("100");
  const [manualInvestAmount, setManualInvestAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawReason, setWithdrawReason] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadBlendData();
  }, [groupId]);

  const loadBlendData = async () => {
    try {
      setIsLoading(true);
      const response: any = await ApiClient.getBlendYieldInfo(groupId);

      setYieldInfo(response.yieldInfo);
      setInvestments(response.investments || []);
      setWithdrawals(response.withdrawals || []);
      setNextAutoInvestDate(response.nextAutoInvestDate);
    } catch (error) {
      console.error("Error loading Blend data:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información de rendimientos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoInvest = async () => {
    if (!isAdmin) return;

    setIsAutoInvesting(true);
    try {
      const response: any = await ApiClient.triggerAutoInvest(
        groupId,
        parseFloat(minAmount)
      );

      if (response.success) {
        toast({
          title: "Auto-inversión exitosa! 🎉",
          description: `Se invirtieron ${formatCurrency(response.amountInvested)} en Blend`,
        });

        // Recargar datos
        await loadBlendData();
      } else {
        toast({
          title: "Auto-inversión no ejecutada",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error en auto-inversión",
        description: error.message || "No se pudo ejecutar la auto-inversión",
        variant: "destructive",
      });
    } finally {
      setIsAutoInvesting(false);
    }
  };

  const handleManualInvest = async () => {
    if (!isAdmin || !manualInvestAmount) return;

    const amount = parseFloat(manualInvestAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingresa una cantidad válida",
        variant: "destructive",
      });
      return;
    }

    setIsManualInvesting(true);
    try {
      const response: any = await ApiClient.manualInvestInBlend(
        groupId,
        amount
      );

      if (response.success) {
        toast({
          title: "Inversión manual exitosa! 🎉",
          description: `Se invirtieron ${formatCurrency(response.amountInvested)} en Blend manualmente`,
        });

        setManualInvestAmount("");
        // Recargar datos
        await loadBlendData();
      } else {
        toast({
          title: "Error en inversión",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error en inversión manual",
        description: error.message || "No se pudo ejecutar la inversión",
        variant: "destructive",
      });
    } finally {
      setIsManualInvesting(false);
    }
  };

  const handleWithdraw = async () => {
    if (!isAdmin || !withdrawAmount) return;

    try {
      const response: any = await ApiClient.withdrawFromBlend(
        groupId,
        parseFloat(withdrawAmount),
        withdrawReason || "Manual withdrawal"
      );

      if (response.success) {
        toast({
          title: "Retiro exitoso! 💰",
          description: `Se retiraron ${formatCurrency(parseFloat(withdrawAmount))} de Blend`,
        });

        setWithdrawAmount("");
        setWithdrawReason("");
        await loadBlendData();
      } else {
        toast({
          title: "Error en retiro",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error en retiro",
        description: error.message || "No se pudo retirar de Blend",
        variant: "destructive",
      });
    }
  };

  const openStellarExplorer = (hash: string) => {
    window.open(`https://stellar.expert/explorer/testnet/tx/${hash}`, "_blank");
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Cargando información de rendimientos...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas de Yield */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invertido
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(yieldInfo?.totalInvested || 0)}
            </div>
            <p className="text-xs text-muted-foreground">En Blend pool</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Actual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(yieldInfo?.currentValue || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Incluye rendimientos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimientos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(yieldInfo?.yieldEarned || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {yieldInfo?.yieldPercentage.toFixed(2)}% APY
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próxima Inversión
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">
              {nextAutoInvestDate
                ? formatDate(nextAutoInvestDate)
                : "No programada"}
            </div>
            <p className="text-xs text-muted-foreground">
              Auto-inversión día 3
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controles de Auto-inversión */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Auto-inversión en Blend</span>
            </CardTitle>
            <CardDescription>
              Invierte automáticamente los fondos del grupo en Blend todos los
              días a las 12 PM
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="minAmount">Cantidad Mínima (USDC)</Label>
                <Input
                  id="minAmount"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="100"
                  min="10"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleAutoInvest}
                  disabled={isAutoInvesting}
                  className="w-full"
                >
                  {isAutoInvesting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Ejecutando...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Ejecutar Auto-inversión
                    </>
                  )}
                </Button>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    /* Abrir configuración */
                  }}
                  className="w-full"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inversión Manual */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="h-5 w-5" />
              <span>Inversión Manual en Blend</span>
            </CardTitle>
            <CardDescription>
              Invierte una cantidad específica de fondos del grupo en Blend
              inmediatamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Coins className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    Inversión Manual Inmediata
                  </p>
                  <p className="text-xs text-blue-700">
                    Esta función permite invertir una cantidad específica en
                    Blend sin esperar la auto-inversión programada. Los fondos
                    se tomarán del balance total del grupo.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="manualInvestAmount">
                  Cantidad a Invertir (USDC)
                </Label>
                <Input
                  id="manualInvestAmount"
                  type="number"
                  value={manualInvestAmount}
                  onChange={(e) => setManualInvestAmount(e.target.value)}
                  placeholder="100.00"
                  min="10"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo: $10.00 USDC
                </p>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleManualInvest}
                  disabled={
                    isManualInvesting ||
                    !manualInvestAmount ||
                    parseFloat(manualInvestAmount) < 10
                  }
                  className="w-full"
                >
                  {isManualInvesting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Invirtiendo...
                    </>
                  ) : (
                    <>
                      <Coins className="h-4 w-4 mr-2" />
                      Invertir Ahora
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Quick amount buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 250, 500].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setManualInvestAmount(amount.toString())}
                  disabled={isManualInvesting}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historial de Inversiones */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Inversiones</CardTitle>
          <CardDescription>
            Registro de todas las inversiones automáticas en Blend
          </CardDescription>
        </CardHeader>
        <CardContent>
          {investments.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No hay inversiones registradas aún
              </p>
              <p className="text-sm text-gray-400">
                Las inversiones automáticas aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Inversión Automática</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(investment.investment_date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      +{formatCurrency(investment.amount_invested)}
                    </p>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          openStellarExplorer(investment.transaction_hash)
                        }
                        title="Ver en Stellar Explorer"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controles de Retiro para Admins */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowDownRight className="h-5 w-5" />
              <span>Retirar de Blend</span>
            </CardTitle>
            <CardDescription>
              Retirar fondos de Blend cuando sea necesario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="withdrawAmount">
                  Cantidad a Retirar (USDC)
                </Label>
                <Input
                  id="withdrawAmount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                />
              </div>
              <div>
                <Label htmlFor="withdrawReason">Razón del Retiro</Label>
                <Input
                  id="withdrawReason"
                  value={withdrawReason}
                  onChange={(e) => setWithdrawReason(e.target.value)}
                  placeholder="Ej: Emergencia, distribución..."
                />
              </div>
            </div>
            <Button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
              variant="outline"
              className="w-full"
            >
              <ArrowDownRight className="h-4 w-4 mr-2" />
              Retirar de Blend
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
