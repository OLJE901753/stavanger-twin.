// Service Worker for Stavanger Twin - Offline Democracy
// For the honor, not the glory - by the people, for the people

const CACHE_NAME = 'stavanger-twin-v1';
const OFFLINE_URL = '/offline';

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/vote',
  '/dossiers',
  '/simulations',
  '/profile',
  '/transparency',
  '/offline',
  '/manifest.json'
];

// API endpoints to cache
const API_CACHE_URLS = [
  '/api/votes',
  '/api/politicians',
  '/api/policies',
  '/api/transparency'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (except API calls)
  if (url.origin !== location.origin && !url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }

        // Try to fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache API responses and static assets
            if (url.pathname.startsWith('/api/') || STATIC_CACHE_URLS.includes(url.pathname)) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  console.log('Service Worker: Caching response', request.url);
                  cache.put(request, responseToCache);
                });
            }

            return response;
          })
          .catch((error) => {
            console.log('Service Worker: Network request failed', request.url, error);
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }

            // Return cached API response if available
            if (url.pathname.startsWith('/api/')) {
              return caches.match(request);
            }

            // Return a generic offline response
            return new Response(
              JSON.stringify({
                error: 'Offline',
                message: 'This content is not available offline. Please check your connection.',
                timestamp: new Date().toISOString()
              }),
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            );
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'vote-sync') {
    event.waitUntil(syncVotes());
  } else if (event.tag === 'report-sync') {
    event.waitUntil(syncReports());
  }
});

// Sync offline votes when connection is restored
async function syncVotes() {
  try {
    const offlineVotes = await getOfflineVotes();
    
    for (const vote of offlineVotes) {
      try {
        const response = await fetch('/api/votes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(vote)
        });

        if (response.ok) {
          console.log('Service Worker: Vote synced successfully', vote.id);
          await removeOfflineVote(vote.id);
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync vote', vote.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Vote sync failed', error);
  }
}

// Sync offline corruption reports when connection is restored
async function syncReports() {
  try {
    const offlineReports = await getOfflineReports();
    
    for (const report of offlineReports) {
      try {
        const response = await fetch('/api/reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(report)
        });

        if (response.ok) {
          console.log('Service Worker: Report synced successfully', report.id);
          await removeOfflineReport(report.id);
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync report', report.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Report sync failed', error);
  }
}

// Helper functions for offline data management
async function getOfflineVotes() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

async function removeOfflineVote(voteId) {
  // This would typically use IndexedDB
  console.log('Service Worker: Removing offline vote', voteId);
}

async function getOfflineReports() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

async function removeOfflineReport(reportId) {
  // This would typically use IndexedDB
  console.log('Service Worker: Removing offline report', reportId);
}

// Push notifications for corruption alerts
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New corruption alert in your area!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Stavanger Twin Alert', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dossiers')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('Service Worker: Loaded successfully');
