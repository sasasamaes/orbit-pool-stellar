import { supabase } from '../lib/supabase';
import { WebSocketService } from './websocket-service';

export interface NotificationData {
  id?: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'transaction' | 'yield' | 'group';
  timestamp: string;
  read: boolean;
  userId: string;
  groupId?: string;
  transactionId?: string;
  amount?: number;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface NotificationPreferences {
  pushEnabled: boolean;
  emailEnabled: boolean;
  inAppEnabled: boolean;
  categories: {
    transactions: boolean;
    yieldUpdates: boolean;
    groupActivity: boolean;
    systemAlerts: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export class NotificationService {
  /**
   * Create a new notification
   */
  static async createNotification(data: Omit<NotificationData, 'id'>): Promise<NotificationData> {
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert([{
        title: data.title,
        message: data.message,
        type: data.type,
        timestamp: data.timestamp,
        read: data.read,
        user_id: data.userId,
        group_id: data.groupId,
        transaction_id: data.transactionId,
        amount: data.amount,
        action_url: data.actionUrl,
        metadata: data.metadata,
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }

    return this.mapFromDatabase(notification);
  }

  /**
   * Get user's notifications
   */
  static async getUserNotifications(
    userId: string, 
    options: { limit?: number; offset?: number; unreadOnly?: boolean } = {}
  ): Promise<NotificationData[]> {
    const { limit = 50, offset = 0, unreadOnly = false } = options;

    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .range(offset, offset + limit - 1);

    if (unreadOnly) {
      query = query.eq('read', false);
    }

    const { data: notifications, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }

    return notifications.map(this.mapFromDatabase);
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('id', notificationId);

    if (error) {
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  static async markAllAsRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) {
      throw new Error(`Failed to mark all notifications as read: ${error.message}`);
    }
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }
  }

  /**
   * Get notification preferences for a user
   */
  static async getNotificationPreferences(userId: string): Promise<NotificationPreferences> {
    const { data: preferences, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // Not found error
      throw new Error(`Failed to fetch notification preferences: ${error.message}`);
    }

    // Return default preferences if none exist
    if (!preferences) {
      return {
        pushEnabled: false,
        emailEnabled: true,
        inAppEnabled: true,
        categories: {
          transactions: true,
          yieldUpdates: true,
          groupActivity: true,
          systemAlerts: true,
        },
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00',
        },
      };
    }

    return {
      pushEnabled: preferences.push_enabled,
      emailEnabled: preferences.email_enabled,
      inAppEnabled: preferences.in_app_enabled,
      categories: preferences.categories || {
        transactions: true,
        yieldUpdates: true,
        groupActivity: true,
        systemAlerts: true,
      },
      quietHours: preferences.quiet_hours || {
        enabled: false,
        start: '22:00',
        end: '08:00',
      },
    };
  }

  /**
   * Update notification preferences for a user
   */
  static async updateNotificationPreferences(
    userId: string, 
    preferences: Partial<NotificationPreferences>
  ): Promise<void> {
    const updateData = {
      user_id: userId,
      push_enabled: preferences.pushEnabled,
      email_enabled: preferences.emailEnabled,
      in_app_enabled: preferences.inAppEnabled,
      categories: preferences.categories,
      quiet_hours: preferences.quietHours,
      updated_at: new Date().toISOString(),
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof typeof updateData] === undefined) {
        delete updateData[key as keyof typeof updateData];
      }
    });

    const { error } = await supabase
      .from('notification_preferences')
      .upsert([updateData]);

    if (error) {
      throw new Error(`Failed to update notification preferences: ${error.message}`);
    }
  }

  /**
   * Send real-time notification via WebSocket
   */
  static async sendRealtimeNotification(notification: NotificationData): Promise<void> {
    try {
      const wsService = WebSocketService.getInstance();
      
      const realtimeEvent = {
        type: 'notification',
        data: notification,
        timestamp: new Date().toISOString(),
        userId: notification.userId,
        groupId: notification.groupId,
      };

      wsService.sendToUser(notification.userId, realtimeEvent);
      
      // Also send to group if applicable
      if (notification.groupId) {
        wsService.sendToGroup(notification.groupId, realtimeEvent);
      }
    } catch (error) {
      console.error('Error sending real-time notification:', error);
      // Don't throw error here as notification is already created
    }
  }

  /**
   * Track notification interactions
   */
  static async trackInteraction(
    notificationId: string, 
    action: string, 
    timestamp: string
  ): Promise<void> {
    const { error } = await supabase
      .from('notification_interactions')
      .insert([{
        notification_id: notificationId,
        action,
        timestamp,
      }]);

    if (error) {
      console.error('Failed to track notification interaction:', error.message);
      // Don't throw error for tracking failures
    }
  }

  /**
   * Get notification analytics for a user
   */
  static async getAnalytics(userId: string, period: string): Promise<any> {
    try {
      const startDate = this.getStartDateForPeriod(period);
      
      // Get notification counts by type
      const { data: typeCounts, error: typeError } = await supabase
        .from('notifications')
        .select('type')
        .eq('user_id', userId)
        .gte('timestamp', startDate.toISOString());

      if (typeError) {
        throw new Error(`Failed to fetch type analytics: ${typeError.message}`);
      }

      // Get interaction rates
      const { data: interactions, error: interactionError } = await supabase
        .from('notification_interactions')
        .select('action, notification_id')
        .gte('timestamp', startDate.toISOString());

      if (interactionError) {
        throw new Error(`Failed to fetch interaction analytics: ${interactionError.message}`);
      }

      // Calculate analytics
      const typeCountMap = typeCounts.reduce((acc, notification) => {
        acc[notification.type] = (acc[notification.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const totalNotifications = typeCounts.length;
      const interactionRate = totalNotifications > 0 
        ? (interactions.length / totalNotifications) * 100 
        : 0;

      return {
        period,
        totalNotifications,
        notificationsByType: typeCountMap,
        interactionRate: Math.round(interactionRate * 100) / 100,
        interactions: interactions.length,
      };
    } catch (error) {
      console.error('Error getting notification analytics:', error);
      return {
        period,
        totalNotifications: 0,
        notificationsByType: {},
        interactionRate: 0,
        interactions: 0,
      };
    }
  }

  /**
   * Clean up old notifications
   */
  static async cleanupOldNotifications(daysToKeep: number = 90): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const { error } = await supabase
      .from('notifications')
      .delete()
      .lt('timestamp', cutoffDate.toISOString());

    if (error) {
      console.error('Failed to cleanup old notifications:', error.message);
    }
  }

  /**
   * Helper method to map database record to NotificationData
   */
  private static mapFromDatabase(dbRecord: any): NotificationData {
    return {
      id: dbRecord.id,
      title: dbRecord.title,
      message: dbRecord.message,
      type: dbRecord.type,
      timestamp: dbRecord.timestamp,
      read: dbRecord.read,
      userId: dbRecord.user_id,
      groupId: dbRecord.group_id,
      transactionId: dbRecord.transaction_id,
      amount: dbRecord.amount,
      actionUrl: dbRecord.action_url,
      metadata: dbRecord.metadata,
    };
  }

  /**
   * Helper method to get start date for analytics period
   */
  private static getStartDateForPeriod(period: string): Date {
    const now = new Date();
    
    switch (period) {
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
  }
}