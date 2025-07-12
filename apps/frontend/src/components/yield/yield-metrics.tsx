'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { YieldInfo, GroupYieldData, BlendService } from '@/lib/blend';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Activity,
  RefreshCw,
  Zap
} from 'lucide-react';

interface YieldMetricsProps {
  yieldInfo?: YieldInfo;
  groupYieldData?: GroupYieldData;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function YieldMetrics({ 
  yieldInfo, 
  groupYieldData, 
  isLoading = false,
  onRefresh 
}: YieldMetricsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-6 w-24 bg-muted rounded mb-2" />
              <div className="h-3 w-16 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalYield = yieldInfo?.totalYield || groupYieldData?.currentYield || 0;
  const totalInvested = groupYieldData?.totalInvested || 0;
  const projectedYield = groupYieldData?.projectedYield || 0;
  const apy = yieldInfo?.apy || 0;
  const dailyYield = yieldInfo?.dailyYield || 0;
  const isAutoInvestEnabled = groupYieldData?.isAutoInvestEnabled || false;

  return (
    <div className="space-y-4">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Yield Performance</h3>
          <p className="text-sm text-muted-foreground">
            Real-time earnings from Blend Protocol
          </p>
        </div>
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>

      {/* Auto-invest status */}
      <div className="flex items-center space-x-2">
        <Badge variant={isAutoInvestEnabled ? 'default' : 'secondary'}>
          <Zap className="h-3 w-3 mr-1" />
          Auto-Invest {isAutoInvestEnabled ? 'Enabled' : 'Disabled'}
        </Badge>
        {groupYieldData?.blendPoolId && (
          <Badge variant="outline">
            Pool: {groupYieldData.blendPoolId}
          </Badge>
        )}
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Yield Earned */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Yield Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalYield)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {formatCurrency(totalInvested)} invested
            </p>
          </CardContent>
        </Card>

        {/* Current APY */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current APY</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {BlendService.formatAPY(apy)}
            </div>
            <p className="text-xs text-muted-foreground">
              Annual percentage yield
            </p>
          </CardContent>
        </Card>

        {/* Daily Earnings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(dailyYield)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average daily yield
            </p>
          </CardContent>
        </Card>

        {/* Projected Yield */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projected Monthly</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(yieldInfo?.monthlyYield || dailyYield * 30)}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated monthly yield
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Yield breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Yield Breakdown</CardTitle>
          <CardDescription>
            Detailed view of your earnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Weekly Yield</p>
              <p className="font-medium">{formatCurrency(yieldInfo?.weeklyYield || dailyYield * 7)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Invested</p>
              <p className="font-medium">{formatCurrency(totalInvested)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Yield Rate</p>
              <p className="font-medium">
                {totalInvested > 0 ? ((totalYield / totalInvested) * 100).toFixed(2) : 0}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Distribution</p>
              <p className="font-medium">
                {yieldInfo?.lastDistribution 
                  ? formatDate(yieldInfo.lastDistribution) 
                  : 'Never'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}