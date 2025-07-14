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
import { useToast } from "@/hooks/use-toast";
import { StellarService, WalletConnection, USDC_ASSET } from "@/lib/stellar";
import { truncateAddress, formatCurrency } from "@/lib/utils";
import {
  Wallet,
  Copy,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Import Stellar Wallets Kit
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  FREIGHTER_ID,
  LOBSTR_ID,
  RABET_ID,
  XBULL_ID,
  ALBEDO_ID,
  HANA_ID,
} from "@creit.tech/stellar-wallets-kit";

interface ConnectWalletProps {
  onConnection?: (connection: WalletConnection) => void;
  showBalance?: boolean;
}

interface SupportedWallet {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const SUPPORTED_WALLETS: SupportedWallet[] = [
  {
    id: FREIGHTER_ID,
    name: "Freighter",
    icon: "🚀",
    description: "Browser extension wallet",
  },
  {
    id: LOBSTR_ID,
    name: "LOBSTR",
    icon: "🦞",
    description: "Web & mobile wallet",
  },
  {
    id: XBULL_ID,
    name: "xBull",
    icon: "🐂",
    description: "Multi-platform wallet",
  },
  {
    id: RABET_ID,
    name: "Rabet",
    icon: "🐰",
    description: "Browser extension wallet",
  },
  {
    id: ALBEDO_ID,
    name: "Albedo",
    icon: "💫",
    description: "Web wallet",
  },
  {
    id: HANA_ID,
    name: "Hana",
    icon: "🌸",
    description: "Browser extension wallet",
  },
];

export function ConnectWallet({
  onConnection,
  showBalance = true,
}: ConnectWalletProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connection, setConnection] = useState<WalletConnection | null>(null);
  const [balances, setBalances] = useState<{
    xlm: number;
    usdc: number;
  } | null>(null);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);
  const { toast } = useToast();

  // Check if any wallet is available
  const isAnyWalletAvailable =
    typeof window !== "undefined" &&
    ("freighter" in window ||
      "rabet" in window ||
      "xBull" in window ||
      window.location.origin.includes("lobstr") ||
      true); // Always true since web wallets are always "available"

  useEffect(() => {
    initializeKit();
    checkExistingConnection();
  }, []);

  useEffect(() => {
    if (connection && showBalance) {
      loadBalances();
    }
  }, [connection, showBalance]);

  const initializeKit = () => {
    try {
      const stellarKit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET, // FORZAR SOLO TESTNET
        selectedWalletId: FREIGHTER_ID,
        modules: allowAllModules(),
      });
      setKit(stellarKit);
    } catch (error) {
      console.error("Error initializing Stellar Wallets Kit:", error);
    }
  };

  const checkExistingConnection = async () => {
    // First, check localStorage for saved connection
    try {
      const savedConnection = localStorage.getItem("stellar_wallet_connection");
      if (savedConnection) {
        const connectionData = JSON.parse(savedConnection);
        const walletConnection: WalletConnection = {
          publicKey: connectionData.publicKey,
          isConnected: true,
          name: connectionData.name,
        };
        setConnection(walletConnection);
        onConnection?.(walletConnection);
        return;
      }
    } catch (error) {
      console.error("Error checking saved connection:", error);
    }

    // Check Freighter for backward compatibility
    if (typeof window !== "undefined" && "freighter" in window) {
      try {
        const isConnected = await (window as any).freighter.isConnected();
        if (isConnected) {
          const publicKey = await (window as any).freighter.getPublicKey();
          const walletConnection: WalletConnection = {
            publicKey,
            isConnected: true,
            name: "Freighter",
          };

          // Save to localStorage
          localStorage.setItem(
            "stellar_wallet_connection",
            JSON.stringify({
              publicKey,
              name: "Freighter",
            })
          );

          setConnection(walletConnection);
          onConnection?.(walletConnection);
        }
      } catch (error) {
        console.error("Error checking existing Freighter connection:", error);
      }
    }
  };

  const connectWallet = async (walletId: string) => {
    if (!kit) {
      toast({
        title: "Error",
        description: "Wallet kit not initialized",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      kit.setWallet(walletId);

      // Verificación de red habilitada - SOLO TESTNET
      try {
        const currentNetwork = await kit.getNetwork();
        console.log("Current network:", currentNetwork); // Debug

        // Verificar si está en testnet
        const isTestnet =
          currentNetwork.network === "testnet" ||
          currentNetwork.networkPassphrase ===
            "Test SDF Network ; September 2015";

        if (!isTestnet) {
          toast({
            title: "❌ Red Incorrecta",
            description:
              "Por favor cambia tu wallet a la red 'Testnet' de Stellar antes de conectar. Ve a la configuración de tu wallet y selecciona 'Testnet'.",
            variant: "destructive",
          });
          setIsConnecting(false);
          return;
        }
      } catch (error) {
        console.warn("Could not verify network:", error);
        toast({
          title: "⚠️ Error de Red",
          description:
            "No se pudo verificar la red del wallet. Asegúrate de que esté configurada en Testnet de Stellar.",
          variant: "destructive",
        });
        setIsConnecting(false);
        return;
      }

      await kit.openModal({
        onWalletSelected: async (option) => {
          try {
            kit.setWallet(option.id);

            // Verificación de red durante la conexión - SOLO TESTNET
            try {
              const network = await kit.getNetwork();
              console.log("Network during connection:", network); // Debug

              // Verificar si está en testnet
              const isTestnet =
                network.network === "testnet" ||
                network.networkPassphrase ===
                  "Test SDF Network ; September 2015";

              if (!isTestnet) {
                toast({
                  title: "❌ Red Incorrecta",
                  description:
                    "Tu wallet debe estar en Testnet. Por favor cambia la red en tu wallet y vuelve a conectar.",
                  variant: "destructive",
                });
                setIsConnecting(false);
                return;
              }
            } catch (error) {
              console.warn(
                "Could not verify network during connection:",
                error
              );
              toast({
                title: "⚠️ Error de Red",
                description:
                  "No se pudo verificar la red. Asegúrate de que tu wallet esté en Testnet.",
                variant: "destructive",
              });
              setIsConnecting(false);
              return;
            }

            const { address } = await kit.getAddress();

            const walletName =
              SUPPORTED_WALLETS.find((w) => w.id === option.id)?.name ||
              option.name;

            const walletConnection: WalletConnection = {
              publicKey: address,
              isConnected: true,
              name: walletName,
            };

            // Save to localStorage
            localStorage.setItem(
              "stellar_wallet_connection",
              JSON.stringify({
                publicKey: address,
                name: walletName,
              })
            );

            setConnection(walletConnection);
            onConnection?.(walletConnection);
            setShowWalletOptions(false);

            toast({
              title: "Wallet Conectada",
              description: `Conectado a ${walletName}: ${truncateAddress(address)}`,
            });
          } catch (error: any) {
            console.error("Error connecting wallet:", error);
            toast({
              title: "Conexión Fallida",
              description: error.message || "Failed to connect to wallet.",
              variant: "destructive",
            });
          }
        },
        onClosed: () => {
          setIsConnecting(false);
        },
      });
    } catch (error: any) {
      console.error("Error opening wallet modal:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to open wallet selection.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Legacy Freighter connection for backward compatibility
  const connectFreighter = async () => {
    if (typeof window === "undefined" || !("freighter" in window)) {
      toast({
        title: "Freighter Not Installed",
        description:
          "Please install the Freighter wallet extension to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      const publicKey = await (window as any).freighter.requestAccess();

      const walletConnection: WalletConnection = {
        publicKey,
        isConnected: true,
        name: "Freighter",
      };

      // Save to localStorage
      localStorage.setItem(
        "stellar_wallet_connection",
        JSON.stringify({
          publicKey,
          name: "Freighter",
        })
      );

      setConnection(walletConnection);
      onConnection?.(walletConnection);

      toast({
        title: "Wallet Connected",
        description: `Connected to ${truncateAddress(publicKey)}`,
      });
    } catch (error: any) {
      console.error("Error connecting to Freighter:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect to Freighter wallet.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const loadBalances = async () => {
    if (!connection) return;

    setIsLoadingBalances(true);
    try {
      const [xlmBalance, usdcBalance] = await Promise.all([
        StellarService.getAccountBalance(connection.publicKey),
        StellarService.getAccountBalance(connection.publicKey, USDC_ASSET),
      ]);

      setBalances({ xlm: xlmBalance, usdc: usdcBalance });
    } catch (error) {
      console.error("Error loading balances:", error);
      toast({
        title: "Error Loading Balances",
        description: "Failed to load account balances.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingBalances(false);
    }
  };

  const fundTestnetAccount = async () => {
    if (!connection) return;

    try {
      await StellarService.fundTestnetAccount(connection.publicKey);
      toast({
        title: "Account Funded",
        description: "Your testnet account has been funded with XLM.",
      });
      loadBalances();
    } catch (error) {
      console.error("Error funding account:", error);
      toast({
        title: "Funding Failed",
        description: "Failed to fund testnet account.",
        variant: "destructive",
      });
    }
  };

  const copyAddress = () => {
    if (connection) {
      navigator.clipboard.writeText(connection.publicKey);
      toast({
        title: "Address Copied",
        description: "Stellar address copied to clipboard.",
      });
    }
  };

  const disconnect = () => {
    try {
      if (kit) {
        kit.disconnect();
      }
    } catch (error) {
      console.error("Error disconnecting kit:", error);
    }

    // Remove from localStorage
    localStorage.removeItem("stellar_wallet_connection");

    setConnection(null);
    setBalances(null);
    setShowWalletOptions(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  if (!isAnyWalletAvailable) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <span>Wallet Required</span>
          </CardTitle>
          <CardDescription>
            You need a Stellar wallet to use this application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={() => window.open("https://freighter.app/", "_blank")}
            className="w-full"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Install Freighter Wallet
          </Button>
          <Button
            onClick={() => window.open("https://lobstr.co/", "_blank")}
            className="w-full"
            variant="outline"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Get LOBSTR Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!connection) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Connect Wallet</span>
          </CardTitle>
          <CardDescription>
            Connect your Stellar wallet to start using OrbitPool.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Testnet Info */}
          <div className="p-3 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-purple-500">
                Solo Testnet
              </span>
            </div>
            <p className="text-xs text-purple-500">
              Esta aplicación funciona solo en la red de testnet de Stellar.
              Asegúrate de que tu wallet esté configurada en Testnet antes de
              conectar.
            </p>
          </div>

          {/* Quick connect with Stellar Wallets Kit */}
          <Button
            onClick={() => connectWallet(FREIGHTER_ID)}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Conectando...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Conectar con Stellar Wallets
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Wallet Connected</span>
          </div>
          <Badge variant="secondary">{connection.name}</Badge>
        </CardTitle>
        <CardDescription>
          {truncateAddress(connection.publicKey)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyAddress}
            className="flex-1"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(
                `https://stellar.expert/explorer/testnet/account/${connection.publicKey}`,
                "_blank"
              )
            }
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {showBalance && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Balances</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadBalances}
                disabled={isLoadingBalances}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoadingBalances ? "animate-spin" : ""}`}
                />
              </Button>
            </div>

            {balances ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm font-medium">XLM</span>
                  <span className="text-sm">{balances.xlm.toFixed(7)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm font-medium">USDC</span>
                  <span className="text-sm">
                    {formatCurrency(balances.usdc)}
                  </span>
                </div>

                {balances.xlm < 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fundTestnetAccount}
                    className="w-full"
                  >
                    Fund Testnet Account
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
          </div>
        )}

        <Button
          variant="destructive"
          size="sm"
          onClick={disconnect}
          className="w-full"
        >
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
}
