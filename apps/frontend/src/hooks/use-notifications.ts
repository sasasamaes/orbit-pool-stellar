import { useState, useEffect, useCallback } from 'react';
import { NotificationService, NotificationData, NotificationPreferences } from '@/lib/notifications';
import { useAuth } from '@/components/providers';
import { useToast } from './use-toast';

export interface UseNotificationsReturn {
  notifications: NotificationData[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  isLoading: boolean;
  isPermissionGranted: boolean;
  
  // Actions
  requestPermission: () => Promise<boolean>;
  subscribeToPush: () => Promise<boolean>;
  unsubscribeFromPush: () => Promise<boolean>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  updatePreferences: (preferences: NotificationPreferences) => Promise<void>;
  refreshNotifications: () => Promise<void>;
  createNotification: (notification: Omit<NotificationData, 'id' | 'timestamp' | 'read' | 'userId'>) => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Check notification permission status
  useEffect(() => {
    if (NotificationService.isSupported()) {
      setIsPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  // Load notifications and preferences on mount
  useEffect(() => {
    if (user?.id) {
      loadNotifications();
      loadPreferences();
    }
  }, [user?.id]);

  const loadNotifications = async () => {
    if (!user?.id) return;

    try {
      const data = await NotificationService.getNotifications(user.id);
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load notifications',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreferences = async () => {
    if (!user?.id) return;

    try {
      const data = await NotificationService.getNotificationPreferences(user.id);
      setPreferences(data);
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  };

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const permission = await NotificationService.requestPermission();
      const granted = permission === 'granted';
      setIsPermissionGranted(granted);
      
      if (granted) {
        toast({
          title: 'Notifications Enabled',
          description: 'You will now receive push notifications',
        });
      } else {
        toast({
          title: 'Notifications Disabled',
          description: 'You can enable notifications later in settings',
          variant: 'destructive',
        });
      }
      
      return granted;
    } catch (error) {
      console.error('Error requesting permission:', error);
      toast({
        title: 'Error',
        description: 'Failed to request notification permission',
        variant: 'destructive',
      });
      return false;
    }
  }, [toast]);

  const subscribeToPush = useCallback(async (): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const subscription = await NotificationService.subscribeToPush(user.id);
      if (subscription) {
        toast({
          title: 'Push Notifications Enabled',
          description: 'You will now receive push notifications',
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error subscribing to push:', error);
      toast({
        title: 'Error',
        description: 'Failed to enable push notifications',
        variant: 'destructive',
      });
      return false;
    }
  }, [user?.id, toast]);

  const unsubscribeFromPush = useCallback(async (): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const success = await NotificationService.unsubscribeFromPush(user.id);
      if (success) {
        toast({
          title: 'Push Notifications Disabled',
          description: 'You will no longer receive push notifications',
        });
      }
      return success;
    } catch (error) {
      console.error('Error unsubscribing from push:', error);
      toast({
        title: 'Error',
        description: 'Failed to disable push notifications',
        variant: 'destructive',
      });
      return false;
    }
  }, [user?.id, toast]);

  const markAsRead = useCallback(async (notificationId: string): Promise<void> => {
    try {
      const success = await NotificationService.markAsRead(notificationId);
      if (success) {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, read: true }
              : notification
          )
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async (): Promise<void> => {
    if (!user?.id) return;

    try {
      const success = await NotificationService.markAllAsRead(user.id);
      if (success) {
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, read: true }))
        );
        toast({
          title: 'All notifications marked as read',
        });
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark all notifications as read',
        variant: 'destructive',
      });
    }
  }, [user?.id, toast]);

  const deleteNotification = useCallback(async (notificationId: string): Promise<void> => {
    try {
      const success = await NotificationService.deleteNotification(notificationId);
      if (success) {
        setNotifications(prev => 
          prev.filter(notification => notification.id !== notificationId)
        );
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete notification',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const updatePreferences = useCallback(async (newPreferences: NotificationPreferences): Promise<void> => {
    if (!user?.id) return;

    try {
      const success = await NotificationService.updateNotificationPreferences(user.id, newPreferences);
      if (success) {
        setPreferences(newPreferences);
        toast({
          title: 'Preferences Updated',
          description: 'Your notification preferences have been saved',
        });
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to update notification preferences',
        variant: 'destructive',
      });
    }
  }, [user?.id, toast]);

  const refreshNotifications = useCallback(async (): Promise<void> => {
    await loadNotifications();
  }, [user?.id]);

  const createNotification = useCallback(async (
    notification: Omit<NotificationData, 'id' | 'timestamp' | 'read' | 'userId'>
  ): Promise<void> => {
    if (!user?.id) return;

    try {
      const notificationId = await NotificationService.createNotification(user.id, notification);
      if (notificationId) {
        // Refresh notifications to include the new one
        await refreshNotifications();
      }
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }, [user?.id, refreshNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    preferences,
    isLoading,
    isPermissionGranted,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updatePreferences,
    refreshNotifications,
    createNotification,
  };
}