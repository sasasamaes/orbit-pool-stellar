'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BlendPoolInfo, BlendService } from '@/lib/blend';
import { WalletConnection } from '@/lib/stellar';
import { formatCurrency } from '@/lib/utils';
import { 
  Zap, 
  ZapOff, 
  Settings, 
  TrendingUp,
  Shield,
  Loader2,
  Info
} from 'lucide-react';

interface AutoInvestControlProps {
  groupId: string;
  isAutoInvestEnabled: boolean;
  currentPoolId?: string;
  availablePools: BlendPoolInfo[];
  walletConnection: WalletConnection | null;
  isProcessing?: boolean;
  onEnableAutoInvest: (poolId: string) => Promise<void>;
  onDisableAutoInvest: () => Promise<void>;
}

export function AutoInvestControl({
  groupId,
  isAutoInvestEnabled,
  currentPoolId,
  availablePools,
  walletConnection,
  isProcessing = false,
  onEnableAutoInvest,
  onDisableAutoInvest,
}: AutoInvestControlProps) {
  const [selectedPoolId, setSelectedPoolId] = useState(currentPoolId || '');
  const [isConfiguring, setIsConfiguring] = useState(false);

  const handleEnableAutoInvest = async () => {
    if (!selectedPoolId) return;
    
    setIsConfiguring(true);
    try {
      await onEnableAutoInvest(selectedPoolId);
    } finally {
      setIsConfiguring(false);
    }
  };

  const handleDisableAutoInvest = async () => {
    setIsConfiguring(true);
    try {
      await onDisableAutoInvest();
    } finally {
      setIsConfiguring(false);
    }
  };

  const currentPool = availablePools.find(pool => pool.poolId === currentPoolId);
  const selectedPool = availablePools.find(pool => pool.poolId === selectedPoolId);
  const isWalletConnected = walletConnection?.isConnected || false;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Auto-Investment Settings</span>
        </CardTitle>
        <CardDescription>
          Automatically invest group funds in Blend Protocol for yield generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            {isAutoInvestEnabled ? (
              <div className="p-2 bg-green-100 rounded-full">
                <Zap className="h-4 w-4 text-green-600" />
              </div>
            ) : (
              <div className="p-2 bg-gray-100 rounded-full">
                <ZapOff className="h-4 w-4 text-gray-600" />
              </div>
            )}
            <div>
              <p className="font-medium">
                Auto-Invest {isAutoInvestEnabled ? 'Enabled' : 'Disabled'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isAutoInvestEnabled 
                  ? `Using ${currentPool?.name || 'Unknown Pool'}`
                  : 'Funds are not automatically invested'
                }
              </p>
            </div>
          </div>
          <Badge variant={isAutoInvestEnabled ? 'default' : 'secondary'}>
            {isAutoInvestEnabled ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Current Pool Info (if enabled) */}
        {isAutoInvestEnabled && currentPool && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-900">{currentPool.name}</h4>
              <Badge variant="outline" className="text-blue-700 border-blue-300">
                {BlendService.formatAPY(currentPool.apy)} APY
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <p className="text-blue-600">Total Supplied</p>
                <p className="font-medium">{formatCurrency(currentPool.totalSupplied)}</p>
              </div>
              <div>
                <p className="text-blue-600">Supported Assets</p>
                <p className="font-medium">{currentPool.supportedAssets.join(', ')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Pool Selection (when configuring) */}
        {!isAutoInvestEnabled && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pool-select">Select Blend Pool</Label>
              <Select 
                value={selectedPoolId} 
                onValueChange={setSelectedPoolId}
                disabled={isProcessing || isConfiguring}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a lending pool..." />
                </SelectTrigger>
                <SelectContent>
                  {availablePools.map((pool) => (
                    <SelectItem key={pool.poolId} value={pool.poolId}>
                      <div className="flex items-center justify-between w-full">
                        <span>{pool.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {BlendService.formatAPY(pool.apy)}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Pool Details */}
            {selectedPool && (
              <div className="p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{selectedPool.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">APY</p>
                    <p className="font-medium text-green-600">
                      {BlendService.formatAPY(selectedPool.apy)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Supplied</p>
                    <p className="font-medium">{formatCurrency(selectedPool.totalSupplied)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Warning/Info Messages */}
        <div className="flex items-start space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">How Auto-Invest Works</p>
            <ul className="text-xs space-y-1">
              <li>• Group contributions are automatically deposited to Blend Protocol</li>
              <li>• Funds earn yield based on the selected pool's APY</li>
              <li>• Yield is distributed proportionally to member contributions</li>
              <li>• Only group admins can change auto-invest settings</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!isAutoInvestEnabled ? (
            <Button 
              onClick={handleEnableAutoInvest}
              disabled={!selectedPoolId || !isWalletConnected || isProcessing || isConfiguring}
              className="flex-1"
            >
              {isConfiguring ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enabling...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Enable Auto-Invest
                </>
              )}
            </Button>
          ) : (
            <Button 
              variant="destructive"
              onClick={handleDisableAutoInvest}
              disabled={!isWalletConnected || isProcessing || isConfiguring}
              className="flex-1"
            >
              {isConfiguring ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Disabling...
                </>
              ) : (
                <>
                  <ZapOff className="mr-2 h-4 w-4" />
                  Disable Auto-Invest
                </>
              )}
            </Button>
          )}
        </div>

        {/* Wallet Connection Warning */}
        {!isWalletConnected && (
          <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <Shield className="h-4 w-4 text-orange-600" />
            <p className="text-sm text-orange-700">
              Connect your wallet to manage auto-investment settings
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}