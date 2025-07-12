import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { NotificationController } from '../controllers/notification-controller';
import { validateNotificationData, validatePreferences } from '../middleware/validation';

const router = Router();

// All routes require authentication
router.use(requireAuth);

// Get user's notifications
router.get('/:userId', NotificationController.getUserNotifications);

// Create a new notification
router.post('/', validateNotificationData, NotificationController.createNotification);

// Mark notification as read
router.put('/:notificationId/read', NotificationController.markAsRead);

// Mark all notifications as read for a user
router.put('/:userId/read-all', NotificationController.markAllAsRead);

// Delete a notification
router.delete('/:notificationId', NotificationController.deleteNotification);

// Get notification preferences
router.get('/preferences/:userId', NotificationController.getPreferences);

// Update notification preferences
router.put('/preferences/:userId', validatePreferences, NotificationController.updatePreferences);

// Subscribe to push notifications
router.post('/subscribe', NotificationController.subscribeToPush);

// Unsubscribe from push notifications
router.post('/unsubscribe', NotificationController.unsubscribeFromPush);

// Send test notification (for development/testing)
router.post('/test/:userId', NotificationController.sendTestNotification);

// Track notification interactions
router.post('/track', NotificationController.trackInteraction);

// Get notification analytics
router.get('/analytics/:userId', NotificationController.getAnalytics);

export default router;