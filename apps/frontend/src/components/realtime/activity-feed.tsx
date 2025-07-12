'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGroupRealtime } from '@/hooks/use-realtime';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  Activity,
  DollarSign,
  TrendingUp,
  Users,
  UserPlus,
  UserMinus,
  Settings,
  AlertTriangle,
  Clock,
  Wifi,
  WifiOff,
  Trash2
} from 'lucide-react';

interface ActivityFeedProps {
  groupId?: string;
  maxEvents?: number;
  showHeader?: boolean;
  className?: string;
}

export function ActivityFeed({ 
  groupId, 
  maxEvents = 20, 
  showHeader = true,
  className = ""
}: ActivityFeedProps) {
  const { groupEvents, clearEvents } = useGroupRealtime(groupId);
  const [filter, setFilter] = useState<'all' | 'transactions' | 'yield' | 'members'>('all');

  const filteredEvents = groupEvents
    .filter(event => {
      if (filter === 'all') return true;
      if (filter === 'transactions') return event.type === 'transaction';
      if (filter === 'yield') return event.type === 'yield_update';
      if (filter === 'members') return event.type === 'member_joined' || event.type === 'member_left';
      return true;
    })
    .slice(0, maxEvents);

  const getEventIcon = (type: string) => {
    const iconClass = "h-4 w-4";
    switch (type) {
      case 'transaction':
        return <DollarSign className={`${iconClass} text-blue-500`} />;
      case 'yield_update':
        return <TrendingUp className={`${iconClass} text-green-500`} />;
      case 'group_update':
        return <Settings className={`${iconClass} text-purple-500`} />;
      case 'member_joined':
        return <UserPlus className={`${iconClass} text-green-500`} />;
      case 'member_left':
        return <UserMinus className={`${iconClass} text-red-500`} />;
      case 'system_alert':
        return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
      default:
        return <Activity className={`${iconClass} text-gray-500`} />;
    }
  };

  const getEventTitle = (event: any) => {
    switch (event.type) {
      case 'transaction':
        return event.data.type === 'contribution' ? 'New Contribution' : 'Withdrawal';
      case 'yield_update':
        return 'Yield Earned';
      case 'group_update':
        return 'Group Updated';
      case 'member_joined':
        return 'Member Joined';
      case 'member_left':
        return 'Member Left';
      case 'system_alert':
        return event.data.title || 'System Alert';
      default:
        return 'Activity';
    }
  };

  const getEventDescription = (event: any) => {
    switch (event.type) {
      case 'transaction':
        return `${event.data.userName || 'Someone'} ${event.data.type === 'contribution' ? 'contributed' : 'withdrew'} ${formatCurrency(event.data.amount)}`;
      case 'yield_update':
        return `Group earned ${formatCurrency(event.data.amount)} in yield`;
      case 'group_update':
        return event.data.message || 'Group settings were updated';
      case 'member_joined':
        return `${event.data.memberName || 'Someone'} joined the group`;
      case 'member_left':
        return `${event.data.memberName || 'Someone'} left the group`;
      case 'system_alert':
        return event.data.message || 'System notification';
      default:
        return 'Activity occurred';
    }
  };

  const getEventBadge = (event: any) => {
    switch (event.type) {
      case 'transaction':
        return (
          <Badge variant={event.data.type === 'contribution' ? 'default' : 'secondary'}>
            {event.data.type === 'contribution' ? '+' : '-'}{formatCurrency(event.data.amount)}
          </Badge>
        );
      case 'yield_update':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            +{formatCurrency(event.data.amount)}
          </Badge>
        );
      case 'member_joined':
        return <Badge variant="default">New</Badge>;
      case 'member_left':
        return <Badge variant="secondary">Left</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <CardTitle>Live Activity</CardTitle>
              {groupEvents.length > 0 && (
                <Badge variant="secondary">{groupEvents.length}</Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Wifi className="h-3 w-3 text-green-500" />
                <span>Live</span>
              </div>
              
              {groupEvents.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearEvents}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          
          <CardDescription>
            Real-time activity updates for your group
          </CardDescription>
          
          {/* Filter buttons */}
          <div className="flex space-x-2 pt-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'transactions', label: 'Transactions' },
              { key: 'yield', label: 'Yield' },
              { key: 'members', label: 'Members' },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter(key as any)}
                className="h-7 text-xs"
              >
                {label}
              </Button>
            ))}
          </div>
        </CardHeader>
      )}

      <CardContent className={showHeader ? "pt-0" : ""}>
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Activity className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium text-sm mb-2">No recent activity</h3>
            <p className="text-xs text-muted-foreground">
              Activity will appear here as it happens
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {filteredEvents.map((event, index) => (
                <div
                  key={`${event.type}-${event.timestamp}-${index}`}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getEventIcon(event.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">
                        {getEventTitle(event)}
                      </h4>
                      {getEventBadge(event)}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      {getEventDescription(event)}
                    </p>
                    
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(event.timestamp)}</span>
                      
                      {event.data.transactionId && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="font-mono">
                            {event.data.transactionId.substring(0, 8)}...
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

// Connection status indicator component
export function ConnectionStatus() {
  const { useRealtime } = require('@/hooks/use-realtime');
  const { connectionStatus, connect } = useRealtime();

  if (connectionStatus.connected) {
    return (
      <div className="flex items-center space-x-2 text-sm text-green-600">
        <Wifi className="h-4 w-4" />
        <span>Connected</span>
      </div>
    );
  }

  if (connectionStatus.reconnecting) {
    return (
      <div className="flex items-center space-x-2 text-sm text-yellow-600">
        <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full" />
        <span>Reconnecting...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-red-600">
      <WifiOff className="h-4 w-4" />
      <span>Disconnected</span>
      <Button variant="ghost" size="sm" onClick={connect} className="h-6 px-2 text-xs">
        Retry
      </Button>
    </div>
  );
}