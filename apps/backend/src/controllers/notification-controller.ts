import { Request, Response } from 'express';
import { NotificationService } from '../services/notification-service';
import { PushNotificationService } from '../services/push-notification-service';
import { EmailService } from '../services/email-service';

export class NotificationController {
  /**
   * Get user's notifications
   */
  static async getUserNotifications(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { limit = 50, offset = 0, unread } = req.query;

      const notifications = await NotificationService.getUserNotifications(
        userId,
        {
          limit: Number(limit),
          offset: Number(offset),
          unreadOnly: unread === 'true',
        }
      );

      res.json(notifications);
    } catch (error) {
      console.error('Error getting user notifications:', error);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  }

  /**
   * Create a new notification
   */
  static async createNotification(req: Request, res: Response) {
    try {
      const notificationData = req.body;

      const notification = await NotificationService.createNotification(notificationData);

      // Get user preferences to determine delivery methods
      const preferences = await NotificationService.getNotificationPreferences(
        notificationData.userId
      );

      // Send via enabled channels
      const deliveryPromises = [];

      if (preferences.inAppEnabled) {
        // In-app notification is already created, send via WebSocket
        deliveryPromises.push(
          NotificationService.sendRealtimeNotification(notification)
        );
      }

      if (preferences.pushEnabled) {
        deliveryPromises.push(
          PushNotificationService.sendToUser(notificationData.userId, {
            title: notification.title,
            body: notification.message,
            data: {
              notificationId: notification.id,
              type: notification.type,
              actionUrl: notification.actionUrl,
            },
          })
        );
      }

      if (preferences.emailEnabled && shouldSendEmail(notification.type, preferences)) {
        deliveryPromises.push(
          EmailService.sendNotificationEmail(notificationData.userId, notification)
        );
      }

      // Execute all delivery methods in parallel
      await Promise.allSettled(deliveryPromises);

      res.status(201).json({ id: notification.id });
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ error: 'Failed to create notification' });
    }
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(req: Request, res: Response) {
    try {
      const { notificationId } = req.params;

      await NotificationService.markAsRead(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  static async markAllAsRead(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      await NotificationService.markAllAsRead(userId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      res.status(500).json({ error: 'Failed to mark all notifications as read' });
    }
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(req: Request, res: Response) {
    try {
      const { notificationId } = req.params;

      await NotificationService.deleteNotification(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  }

  /**
   * Get notification preferences
   */
  static async getPreferences(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const preferences = await NotificationService.getNotificationPreferences(userId);
      res.json(preferences);
    } catch (error) {
      console.error('Error getting notification preferences:', error);
      res.status(500).json({ error: 'Failed to fetch preferences' });
    }
  }

  /**
   * Update notification preferences
   */
  static async updatePreferences(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const preferences = req.body;

      await NotificationService.updateNotificationPreferences(userId, preferences);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      res.status(500).json({ error: 'Failed to update preferences' });
    }
  }

  /**
   * Subscribe to push notifications
   */
  static async subscribeToPush(req: Request, res: Response) {
    try {
      const { userId, subscription } = req.body;

      await PushNotificationService.saveSubscription(userId, subscription);
      
      // Update user preferences to enable push notifications
      await NotificationService.updateNotificationPreferences(userId, {
        pushEnabled: true,
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      res.status(500).json({ error: 'Failed to subscribe to push notifications' });
    }
  }

  /**
   * Unsubscribe from push notifications
   */
  static async unsubscribeFromPush(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      await PushNotificationService.removeSubscription(userId);
      
      // Update user preferences to disable push notifications
      await NotificationService.updateNotificationPreferences(userId, {
        pushEnabled: false,
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      res.status(500).json({ error: 'Failed to unsubscribe from push notifications' });
    }
  }

  /**
   * Send test notification
   */
  static async sendTestNotification(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { type = 'info' } = req.body;

      const testNotification = {
        userId,
        title: 'Test Notification',
        message: 'This is a test notification from Community Wallet',
        type,
        timestamp: new Date().toISOString(),
        read: false,
      };

      const notification = await NotificationService.createNotification(testNotification);

      // Send test push notification
      await PushNotificationService.sendToUser(userId, {
        title: testNotification.title,
        body: testNotification.message,
        data: {
          notificationId: notification.id,
          type: testNotification.type,
        },
      });

      res.json({ success: true, notificationId: notification.id });
    } catch (error) {
      console.error('Error sending test notification:', error);
      res.status(500).json({ error: 'Failed to send test notification' });
    }
  }

  /**
   * Track notification interactions
   */
  static async trackInteraction(req: Request, res: Response) {
    try {
      const { notificationId, action, timestamp } = req.body;

      await NotificationService.trackInteraction(notificationId, action, timestamp);
      res.json({ success: true });
    } catch (error) {
      console.error('Error tracking notification interaction:', error);
      res.status(500).json({ error: 'Failed to track interaction' });
    }
  }

  /**
   * Get notification analytics
   */
  static async getAnalytics(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { period = '30d' } = req.query;

      const analytics = await NotificationService.getAnalytics(userId, period as string);
      res.json(analytics);
    } catch (error) {
      console.error('Error getting notification analytics:', error);
      res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  }
}

/**
 * Helper function to determine if email should be sent based on preferences
 */
function shouldSendEmail(notificationType: string, preferences: any): boolean {
  // Check if it's quiet hours
  if (preferences.quietHours?.enabled) {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    if (currentTime >= preferences.quietHours.start && currentTime <= preferences.quietHours.end) {
      return false;
    }
  }

  // Check category preferences
  switch (notificationType) {
    case 'transaction':
      return preferences.categories?.transactions ?? true;
    case 'yield':
      return preferences.categories?.yieldUpdates ?? true;
    case 'group':
      return preferences.categories?.groupActivity ?? true;
    case 'error':
    case 'warning':
      return preferences.categories?.systemAlerts ?? true;
    default:
      return true;
  }
}