import { useState, useEffect, useCallback, useRef } from 'react';
import { RealtimeService, RealtimeEvent, ConnectionStatus } from '@/lib/realtime';
import { useAuth } from '@/components/providers';

export interface UseRealtimeReturn {
  connectionStatus: ConnectionStatus;
  isConnected: boolean;
  isReconnecting: boolean;
  
  // Actions
  connect: () => void;
  disconnect: () => void;
  subscribe: (eventType: string, callback: (event: RealtimeEvent) => void) => () => void;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  send: (message: any) => void;
}

export function useRealtime(): UseRealtimeReturn {
  const { user } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ 
    connected: false, 
    reconnecting: false 
  });
  const realtimeService = useRef(RealtimeService.getInstance());
  const unsubscribeStatusRef = useRef<(() => void) | null>(null);

  // Subscribe to connection status changes
  useEffect(() => {
    const unsubscribe = realtimeService.current.onStatusChange(setConnectionStatus);
    unsubscribeStatusRef.current = unsubscribe;

    return () => {
      unsubscribe();
    };
  }, []);

  // Auto-connect when user is available
  useEffect(() => {
    if (user?.id && !connectionStatus.connected && !connectionStatus.reconnecting) {
      connect();
    }

    return () => {
      if (connectionStatus.connected) {
        disconnect();
      }
    };
  }, [user?.id]);

  const connect = useCallback(() => {
    if (user?.id) {
      realtimeService.current.connect(user.id);
    }
  }, [user?.id]);

  const disconnect = useCallback(() => {
    realtimeService.current.disconnect();
  }, []);

  const subscribe = useCallback((
    eventType: string, 
    callback: (event: RealtimeEvent) => void
  ): (() => void) => {
    return realtimeService.current.subscribe(eventType, callback);
  }, []);

  const joinGroup = useCallback((groupId: string) => {
    realtimeService.current.joinGroup(groupId);
  }, []);

  const leaveGroup = useCallback((groupId: string) => {
    realtimeService.current.leaveGroup(groupId);
  }, []);

  const send = useCallback((message: any) => {
    realtimeService.current.send(message);
  }, []);

  return {
    connectionStatus,
    isConnected: connectionStatus.connected,
    isReconnecting: connectionStatus.reconnecting,
    connect,
    disconnect,
    subscribe,
    joinGroup,
    leaveGroup,
    send,
  };
}

// Hook for specific group realtime updates
export function useGroupRealtime(groupId: string | undefined) {
  const { subscribe, joinGroup, leaveGroup, isConnected } = useRealtime();
  const [groupEvents, setGroupEvents] = useState<RealtimeEvent[]>([]);

  // Join/leave group channel when groupId changes
  useEffect(() => {
    if (groupId && isConnected) {
      joinGroup(groupId);
      
      return () => {
        leaveGroup(groupId);
      };
    }
  }, [groupId, isConnected, joinGroup, leaveGroup]);

  // Subscribe to group-specific events
  useEffect(() => {
    const unsubscribeTransaction = subscribe('transaction', (event) => {
      if (event.groupId === groupId) {
        setGroupEvents(prev => [event, ...prev.slice(0, 49)]); // Keep last 50 events
      }
    });

    const unsubscribeYield = subscribe('yield_update', (event) => {
      if (event.groupId === groupId) {
        setGroupEvents(prev => [event, ...prev.slice(0, 49)]);
      }
    });

    const unsubscribeGroupUpdate = subscribe('group_update', (event) => {
      if (event.groupId === groupId) {
        setGroupEvents(prev => [event, ...prev.slice(0, 49)]);
      }
    });

    const unsubscribeMemberJoined = subscribe('member_joined', (event) => {
      if (event.groupId === groupId) {
        setGroupEvents(prev => [event, ...prev.slice(0, 49)]);
      }
    });

    const unsubscribeMemberLeft = subscribe('member_left', (event) => {
      if (event.groupId === groupId) {
        setGroupEvents(prev => [event, ...prev.slice(0, 49)]);
      }
    });

    return () => {
      unsubscribeTransaction();
      unsubscribeYield();
      unsubscribeGroupUpdate();
      unsubscribeMemberJoined();
      unsubscribeMemberLeft();
    };
  }, [groupId, subscribe]);

  const clearEvents = useCallback(() => {
    setGroupEvents([]);
  }, []);

  return {
    groupEvents,
    clearEvents,
  };
}

// Hook for transaction monitoring
export function useTransactionAlerts() {
  const { subscribe } = useRealtime();
  const [alerts, setAlerts] = useState<RealtimeEvent[]>([]);

  useEffect(() => {
    const unsubscribe = subscribe('system_alert', (event) => {
      if (event.data.type === 'large_transaction' || 
          event.data.type === 'unusual_activity' || 
          event.data.type === 'low_balance') {
        setAlerts(prev => [event, ...prev.slice(0, 19)]); // Keep last 20 alerts
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => 
      alert.timestamp !== alertId && 
      `${alert.type}-${alert.timestamp}` !== alertId
    ));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
    alerts,
    dismissAlert,
    clearAllAlerts,
  };
}

// Hook for yield monitoring
export function useYieldAlerts() {
  const { subscribe } = useRealtime();
  const [yieldEvents, setYieldEvents] = useState<RealtimeEvent[]>([]);

  useEffect(() => {
    const unsubscribeYield = subscribe('yield_update', (event) => {
      setYieldEvents(prev => [event, ...prev.slice(0, 9)]); // Keep last 10 yield events
    });

    const unsubscribeMilestone = subscribe('system_alert', (event) => {
      if (event.data.type === 'yield_milestone') {
        setYieldEvents(prev => [event, ...prev.slice(0, 9)]);
      }
    });

    return () => {
      unsubscribeYield();
      unsubscribeMilestone();
    };
  }, [subscribe]);

  const clearYieldEvents = useCallback(() => {
    setYieldEvents([]);
  }, []);

  return {
    yieldEvents,
    clearYieldEvents,
  };
}