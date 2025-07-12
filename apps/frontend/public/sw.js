// Service Worker for Push Notifications
// Community Wallet PWA

const CACHE_NAME = 'community-wallet-v1';
const NOTIFICATION_CACHE = 'notifications-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/favicon.ico',
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== NOTIFICATION_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Push event
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);

  if (!event.data) {
    console.log('No data in push event');
    return;
  }

  let notificationData;
  try {
    notificationData = event.data.json();
  } catch (error) {
    console.error('Error parsing push data:', error);
    notificationData = {
      title: 'Community Wallet',
      body: event.data.text(),
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
    };
  }

  const {
    title = 'Community Wallet',
    body = 'You have a new notification',
    icon = '/icons/icon-192x192.png',
    badge = '/icons/badge-72x72.png',
    data = {},
    actions = [],
    requireInteraction = false,
    silent = false,
    tag,
    renotify = false,
  } = notificationData;

  // Create notification options
  const options = {
    body,
    icon,
    badge,
    data: {
      ...data,
      timestamp: Date.now(),
      url: data.actionUrl || '/',
    },
    actions: actions.length > 0 ? actions : [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/action-view.png',
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png',
      },
    ],
    requireInteraction,
    silent,
    tag: tag || `notification-${Date.now()}`,
    renotify,
    vibrate: [200, 100, 200],
    timestamp: Date.now(),
  };

  // Store notification in cache for offline access
  event.waitUntil(
    Promise.all([
      self.registration.showNotification(title, options),
      caches.open(NOTIFICATION_CACHE).then((cache) => {
        const notificationRecord = {
          id: options.tag,
          title,
          ...options,
          timestamp: Date.now(),
        };
        return cache.put(
          `/notifications/${options.tag}`,
          new Response(JSON.stringify(notificationRecord))
        );
      }),
    ])
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification);

  const notification = event.notification;
  const action = event.action;
  const data = notification.data || {};

  notification.close();

  if (action === 'dismiss') {
    // Just close the notification
    return;
  }

  // Handle notification click
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const urlToOpen = data.url || '/';

      // Check if there's already a window open with the app
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          // Navigate to the relevant page and focus the window
          client.postMessage({
            type: 'NOTIFICATION_CLICKED',
            data: {
              notificationId: notification.tag,
              action,
              url: urlToOpen,
              ...data,
            },
          });
          return client.focus();
        }
      }

      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );

  // Track notification interaction
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    self.registration.sync.register('notification-interaction');
  }
});

// Notification close event
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event.notification);

  const notification = event.notification;
  
  // Track notification dismissal
  event.waitUntil(
    fetch('/api/notifications/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationId: notification.tag,
        action: 'dismissed',
        timestamp: Date.now(),
      }),
    }).catch((error) => {
      console.error('Error tracking notification dismissal:', error);
    })
  );
});

// Background sync event
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);

  if (event.tag === 'notification-interaction') {
    event.waitUntil(
      // Sync notification interactions when back online
      syncNotificationInteractions()
    );
  }
});

// Message event (for communication with main thread)
self.addEventListener('message', (event) => {
  console.log('Service worker received message:', event.data);

  const { type, data } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    
    case 'GET_CACHED_NOTIFICATIONS':
      event.waitUntil(
        getCachedNotifications().then((notifications) => {
          event.ports[0].postMessage({ notifications });
        })
      );
      break;
    
    case 'CLEAR_NOTIFICATION_CACHE':
      event.waitUntil(
        caches.delete(NOTIFICATION_CACHE).then(() => {
          event.ports[0].postMessage({ success: true });
        })
      );
      break;
    
    default:
      console.log('Unknown message type:', type);
  }
});

// Helper functions
async function getCachedNotifications() {
  try {
    const cache = await caches.open(NOTIFICATION_CACHE);
    const requests = await cache.keys();
    const notifications = [];

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const notificationData = await response.json();
        notifications.push(notificationData);
      }
    }

    return notifications.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error getting cached notifications:', error);
    return [];
  }
}

async function syncNotificationInteractions() {
  try {
    // This would sync any pending notification interactions
    // when the device comes back online
    console.log('Syncing notification interactions...');
    
    // Implementation would depend on your backend API
    // For now, just log that sync occurred
    return Promise.resolve();
  } catch (error) {
    console.error('Error syncing notification interactions:', error);
    throw error;
  }
}

// Fetch event (for caching strategy)
self.addEventListener('fetch', (event) => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip caching for API requests and WebSocket connections
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('/ws') ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request).then((fetchResponse) => {
        // Cache successful responses
        if (fetchResponse.status === 200) {
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return fetchResponse;
      });
    }).catch(() => {
      // Return offline page for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('/offline.html');
      }
    })
  );
});

// Error event
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

// Unhandled rejection event
self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});