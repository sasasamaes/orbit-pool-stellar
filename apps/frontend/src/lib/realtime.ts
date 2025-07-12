import { NotificationService, NotificationData } from './notifications';

export interface RealtimeEvent {
  type: 'transaction' | 'yield_update' | 'group_update' | 'member_joined' | 'member_left' | 'system_alert';
  data: any;
  timestamp: string;
  userId?: string;
  groupId?: string;
}

export interface ConnectionStatus {
  connected: boolean;
  reconnecting: boolean;
  lastConnected?: string;
  error?: string;
}

export class RealtimeService {
  private static instance: RealtimeService;
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private eventListeners = new Map<string, Set<(event: RealtimeEvent) => void>>();
  private statusListeners = new Set<(status: ConnectionStatus) => void>();
  private connectionStatus: ConnectionStatus = { connected: false, reconnecting: false };

  private constructor() {}

  static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  /**
   * Connect to the WebSocket server
   */
  connect(userId: string): void {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
    
    try {
      this.ws = new WebSocket(`${wsUrl}?userId=${userId}`);
      
      this.ws.onopen = () => {
        console.log('🔗 WebSocket connected');
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
        this.updateConnectionStatus({ 
          connected: true, 
          reconnecting: false, 
          lastConnected: new Date().toISOString() 
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const realtimeEvent: RealtimeEvent = JSON.parse(event.data);
          this.handleRealtimeEvent(realtimeEvent);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        this.updateConnectionStatus({ 
          connected: false, 
          reconnecting: false 
        });
        this.attemptReconnect(userId);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.updateConnectionStatus({ 
          connected: false, 
          reconnecting: false, 
          error: 'Connection error' 
        });
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.updateConnectionStatus({ 
        connected: false, 
        reconnecting: false, 
        error: 'Failed to connect' 
      });
    }
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.updateConnectionStatus({ connected: false, reconnecting: false });
  }

  /**
   * Subscribe to realtime events
   */
  subscribe(eventType: string, callback: (event: RealtimeEvent) => void): () => void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    
    this.eventListeners.get(eventType)!.add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.eventListeners.get(eventType);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.eventListeners.delete(eventType);
        }
      }
    };
  }

  /**
   * Subscribe to connection status changes
   */
  onStatusChange(callback: (status: ConnectionStatus) => void): () => void {
    this.statusListeners.add(callback);
    
    // Send current status immediately
    callback(this.connectionStatus);

    // Return unsubscribe function
    return () => {
      this.statusListeners.delete(callback);
    };
  }

  /**
   * Send message to server
   */
  send(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }

  /**
   * Join a group channel for group-specific updates
   */
  joinGroup(groupId: string): void {
    this.send({
      type: 'join_group',
      groupId,
    });
  }

  /**
   * Leave a group channel
   */
  leaveGroup(groupId: string): void {
    this.send({
      type: 'leave_group',
      groupId,
    });
  }

  /**
   * Get current connection status
   */
  getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus };
  }

  private attemptReconnect(userId: string): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('❌ Max reconnection attempts reached');
      this.updateConnectionStatus({ 
        connected: false, 
        reconnecting: false, 
        error: 'Max reconnection attempts reached' 
      });
      return;
    }

    this.reconnectAttempts++;
    this.updateConnectionStatus({ 
      connected: false, 
      reconnecting: true 
    });

    console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    this.reconnectTimer = setTimeout(() => {
      this.connect(userId);
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000); // Max 30 seconds
    }, this.reconnectDelay);
  }

  private updateConnectionStatus(status: Partial<ConnectionStatus>): void {
    this.connectionStatus = { ...this.connectionStatus, ...status };
    this.statusListeners.forEach(listener => listener(this.connectionStatus));
  }

  private handleRealtimeEvent(event: RealtimeEvent): void {
    console.log('📡 Received realtime event:', event.type, event);

    // Emit to specific event listeners
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }

    // Emit to wildcard listeners
    const wildcardListeners = this.eventListeners.get('*');
    if (wildcardListeners) {
      wildcardListeners.forEach(callback => callback(event));
    }

    // Create notification based on event type
    this.createNotificationFromEvent(event);
  }

  private createNotificationFromEvent(event: RealtimeEvent): void {
    let notification: Omit<NotificationData, 'id' | 'timestamp' | 'read' | 'userId'> | null = null;

    switch (event.type) {
      case 'transaction':
        notification = {
          title: 'New Transaction',
          message: `${event.data.type === 'contribution' ? 'Received' : 'Sent'} $${event.data.amount}`,
          type: 'transaction',
          groupId: event.groupId,
          transactionId: event.data.id,
          amount: event.data.amount,
          actionUrl: `/groups/${event.groupId}`,
        };
        break;

      case 'yield_update':
        notification = {
          title: 'Yield Update',
          message: `Your group earned $${event.data.amount} in yield`,
          type: 'yield',
          groupId: event.groupId,
          amount: event.data.amount,
          actionUrl: `/groups/${event.groupId}`,
        };
        break;

      case 'group_update':
        notification = {
          title: 'Group Update',
          message: event.data.message || 'Group settings have been updated',
          type: 'group',
          groupId: event.groupId,
          actionUrl: `/groups/${event.groupId}`,
        };
        break;

      case 'member_joined':
        notification = {
          title: 'New Member',
          message: `${event.data.memberName} joined your group`,
          type: 'group',
          groupId: event.groupId,
          actionUrl: `/groups/${event.groupId}`,
        };
        break;

      case 'member_left':
        notification = {
          title: 'Member Left',
          message: `${event.data.memberName} left your group`,
          type: 'group',
          groupId: event.groupId,
          actionUrl: `/groups/${event.groupId}`,
        };
        break;

      case 'system_alert':
        notification = {
          title: event.data.title || 'System Alert',
          message: event.data.message,
          type: event.data.severity || 'info',
          actionUrl: event.data.actionUrl,
        };
        break;
    }

    if (notification) {
      // Show in-app notification
      NotificationService.showInAppNotification(notification);

      // Store notification in backend (if user ID is available)
      if (event.userId) {
        NotificationService.createNotification(event.userId, notification);
      }
    }
  }
}

// Alert system for transaction monitoring
export class AlertService {
  private static readonly ALERT_THRESHOLDS = {
    LARGE_TRANSACTION: 1000,
    UNUSUAL_ACTIVITY: 5, // Number of transactions in short period
    LOW_BALANCE_WARNING: 50,
    YIELD_MILESTONE: 100,
  };

  /**
   * Monitor transactions for unusual patterns
   */
  static monitorTransaction(transaction: any, groupHistory: any[]): void {
    // Large transaction alert
    if (transaction.amount >= this.ALERT_THRESHOLDS.LARGE_TRANSACTION) {
      this.createAlert({
        type: 'large_transaction',
        severity: 'warning',
        title: 'Large Transaction Detected',
        message: `Transaction of $${transaction.amount} detected`,
        data: { transactionId: transaction.id, amount: transaction.amount },
      });
    }

    // Unusual activity pattern
    const recentTransactions = groupHistory.filter(
      t => Date.now() - new Date(t.createdAt).getTime() < 3600000 // Last hour
    );
    
    if (recentTransactions.length >= this.ALERT_THRESHOLDS.UNUSUAL_ACTIVITY) {
      this.createAlert({
        type: 'unusual_activity',
        severity: 'info',
        title: 'High Activity Detected',
        message: `${recentTransactions.length} transactions in the last hour`,
        data: { count: recentTransactions.length },
      });
    }
  }

  /**
   * Monitor group balance for low balance warnings
   */
  static monitorBalance(groupId: string, balance: number): void {
    if (balance <= this.ALERT_THRESHOLDS.LOW_BALANCE_WARNING) {
      this.createAlert({
        type: 'low_balance',
        severity: 'warning',
        title: 'Low Balance Warning',
        message: `Group balance is now $${balance}`,
        data: { groupId, balance },
      });
    }
  }

  /**
   * Monitor yield milestones
   */
  static monitorYield(groupId: string, totalYield: number): void {
    const milestones = [100, 500, 1000, 5000, 10000];
    const reachedMilestone = milestones.find(
      milestone => totalYield >= milestone && totalYield < milestone + 50
    );

    if (reachedMilestone) {
      this.createAlert({
        type: 'yield_milestone',
        severity: 'success',
        title: 'Yield Milestone Reached!',
        message: `Your group has earned over $${reachedMilestone} in total yield`,
        data: { groupId, milestone: reachedMilestone, totalYield },
      });
    }
  }

  private static createAlert(alert: {
    type: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    data: any;
  }): void {
    // Send alert through realtime service
    const realtimeService = RealtimeService.getInstance();
    
    const alertEvent: RealtimeEvent = {
      type: 'system_alert',
      data: alert,
      timestamp: new Date().toISOString(),
    };

    // Emit alert locally
    realtimeService['handleRealtimeEvent'](alertEvent);
  }
}

// Export singleton instance
export const realtimeService = RealtimeService.getInstance();