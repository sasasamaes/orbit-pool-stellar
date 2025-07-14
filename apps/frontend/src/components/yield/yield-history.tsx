"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YieldHistoryEntry, BlendService } from "@/lib/blend";
import { formatDate } from "@/lib/utils";
import {
  TrendingUp,
  ArrowUpRight,
  Send,
  ExternalLink,
  Calendar,
  Empty,
} from "lucide-react";

interface YieldHistoryProps {
  yieldHistory: YieldHistoryEntry[];
  isLoading?: boolean;
  showViewAllButton?: boolean;
  onViewTransaction?: (transactionId: string) => void;
}

export function YieldHistory({
  yieldHistory,
  isLoading = false,
  showViewAllButton = false,
  onViewTransaction,
}: YieldHistoryProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Yield History</CardTitle>
          <CardDescription>Loading yield activity...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border rounded-lg animate-pulse"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-3 w-24 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getYieldIcon = (type: YieldHistoryEntry["type"]) => {
    switch (type) {
      case "yield_earned":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "yield_distributed":
        return <Send className="h-4 w-4 text-blue-600" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-gray-600" />;
    }
  };

  const getYieldBadgeVariant = (type: YieldHistoryEntry["type"]) => {
    switch (type) {
      case "yield_earned":
        return "default" as const;
      case "yield_distributed":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  const getYieldDescription = (type: YieldHistoryEntry["type"]) => {
    switch (type) {
      case "yield_earned":
        return "Yield earned from Blend Protocol";
      case "yield_distributed":
        return "Yield distributed to members";
      default:
        return "Yield activity";
    }
  };

  const formatYieldAmount = (
    amount: number,
    type: YieldHistoryEntry["type"]
  ) => {
    const formattedAmount = BlendService.formatYieldAmount(amount);
    return type === "yield_distributed"
      ? formattedAmount
      : `+${formattedAmount}`;
  };

  const getAmountColor = (type: YieldHistoryEntry["type"]) => {
    switch (type) {
      case "yield_earned":
        return "text-green-600";
      case "yield_distributed":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  if (yieldHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Yield History</CardTitle>
          <CardDescription>Track your yield earning activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="p-3 bg-muted rounded-full mb-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">No Yield Activity Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enable auto-invest to start earning yield on your group's funds
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Yield History</CardTitle>
            <CardDescription>
              Recent yield activity and distributions
            </CardDescription>
          </div>
          {showViewAllButton && yieldHistory.length > 5 && (
            <Button variant="outline" size="sm">
              View All
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {yieldHistory
            .slice(0, showViewAllButton ? 5 : undefined)
            .map((entry, index) => (
              <div
                key={`${entry.date}-${index}`}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      entry.type === "yield_earned"
                        ? "bg-green-100"
                        : entry.type === "yield_distributed"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                    }`}
                  >
                    {getYieldIcon(entry.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm">
                        {getYieldDescription(entry.type)}
                      </p>
                      <Badge
                        variant={getYieldBadgeVariant(entry.type)}
                        className="text-xs"
                      >
                        {entry.type === "yield_earned"
                          ? "Earned"
                          : "Distributed"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{formatDate(entry.date)}</span>
                      {entry.transactionId && (
                        <>
                          <span>•</span>
                          <button
                            onClick={() =>
                              onViewTransaction?.(entry.transactionId!)
                            }
                            className="hover:text-primary transition-colors"
                          >
                            View Transaction
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${getAmountColor(entry.type)}`}>
                    {formatYieldAmount(entry.amount, entry.type)}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Summary */}
        {yieldHistory.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Earned</p>
                <p className="font-medium text-green-600">
                  {BlendService.formatYieldAmount(
                    yieldHistory
                      .filter((entry) => entry.type === "yield_earned")
                      .reduce((sum, entry) => sum + entry.amount, 0)
                  )}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Distributed</p>
                <p className="font-medium text-blue-600">
                  {BlendService.formatYieldAmount(
                    yieldHistory
                      .filter((entry) => entry.type === "yield_distributed")
                      .reduce((sum, entry) => sum + entry.amount, 0)
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
