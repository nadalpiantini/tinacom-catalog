// Tinacom Service Worker - PWA Support
// Version 1.0.0

const CACHE_NAME = 'tinacom-v1.0.0';
const STATIC_CACHE_NAME = 'tinacom-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'tinacom-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/productos',
  '/soporte',
  '/configurar',
  '/documentos',
  '/manifest.json',
  '/items/tinacom-logo.svg',
  '/items/Logo-Vector-Tinacom-black-01-e1696042688700 (1).png',
  '/offline.html'  // Fallback page
];

// Product images to cache on demand
const PRODUCT_IMAGES = [
  '/items/0001015240.webp',
  '/items/0001016137.webp', 
  '/items/Tinacos_20Tinacom_20codigo_2010856.webp',
  '/items/download_4eff6911-0691-408d-aca8-248c607a8530.jpg',
  '/items/tinaco-450l-1.svg'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache product images 
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        console.log('[SW] Caching product images');
        return cache.addAll(PRODUCT_IMAGES);
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      self.skipWaiting(); // Force activation
    }).catch(error => {
      console.error('[SW] Installation failed:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim(); // Take control immediately
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request).then(response => {
      // Return cached version if available
      if (response) {
        console.log('[SW] Serving from cache:', request.url);
        return response;
      }

      // Fetch from network
      return fetch(request).then(networkResponse => {
        // Don't cache if not successful
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Cache dynamic content
        const responseClone = networkResponse.clone();
        
        // Determine cache strategy based on URL
        let cacheName = DYNAMIC_CACHE_NAME;
        
        if (isStaticAsset(request.url)) {
          cacheName = STATIC_CACHE_NAME;
        }
        
        // Cache the response
        caches.open(cacheName).then(cache => {
          cache.put(request, responseClone);
          console.log('[SW] Cached:', request.url);
        });

        return networkResponse;
        
      }).catch(error => {
        console.log('[SW] Network failed, serving offline page:', error);
        
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/offline.html') || 
                 new Response('Offline - Please check your connection', {
                   status: 200,
                   headers: { 'Content-Type': 'text/html' }
                 });
        }
        
        // Return empty response for other requests
        return new Response('', { status: 200 });
      });
    })
  );
});

// Background sync for QR scan results
self.addEventListener('sync', event => {
  if (event.tag === 'qr-scan-sync') {
    console.log('[SW] Background sync: QR scan data');
    event.waitUntil(syncQRScanData());
  }
});

// Message handler for QR scanner operations
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_QR_SCAN') {
    event.waitUntil(cacheQRScanResult(event.data.payload));
  } else if (event.data && event.data.type === 'SYNC_QR_SCANS') {
    event.waitUntil(syncQRScanData());
  } else if (event.data && event.data.type === 'GET_CACHED_SCANS') {
    event.waitUntil(getCachedScans().then(scans => {
      event.ports[0].postMessage({ scans });
    }));
  }
});

// QR Scanner specific caching
async function cacheQRScanResult(scanData) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    
    // Store scan result with timestamp
    const scanResult = {
      ...scanData,
      timestamp: Date.now(),
      synced: false
    };
    
    // Cache in IndexedDB-like structure using cache API
    const request = new Request(`/qr-scan/${scanData.id}`, {
      method: 'POST',
      body: JSON.stringify(scanResult),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const response = new Response(JSON.stringify(scanResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
    await cache.put(request, response);
    console.log('[SW] QR scan cached:', scanData.id);
    
    // Trigger background sync if online
    if (navigator.onLine) {
      await self.registration.sync.register('qr-scan-sync');
    }
    
  } catch (error) {
    console.error('[SW] Error caching QR scan:', error);
  }
}

// Get all cached QR scans
async function getCachedScans() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const requests = await cache.keys();
    const qrRequests = requests.filter(req => req.url.includes('/qr-scan/'));
    
    const scans = [];
    for (const request of qrRequests) {
      const response = await cache.match(request);
      if (response) {
        const scanData = await response.json();
        scans.push(scanData);
      }
    }
    
    // Sort by timestamp, newest first
    return scans.sort((a, b) => b.timestamp - a.timestamp);
    
  } catch (error) {
    console.error('[SW] Error getting cached scans:', error);
    return [];
  }
}

// Enhanced QR sync with retry logic
async function syncQRScanData() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const requests = await cache.keys();
    const qrRequests = requests.filter(req => req.url.includes('/qr-scan/'));
    
    let syncCount = 0;
    const maxRetries = 3;
    
    for (const request of qrRequests) {
      const response = await cache.match(request);
      if (!response) continue;
      
      const scanData = await response.json();
      
      // Skip already synced items
      if (scanData.synced) continue;
      
      // Attempt to sync with backend
      let synced = false;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          // Here you would send to your analytics/backend API
          // For now, we'll just simulate success
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Mark as synced
          scanData.synced = true;
          scanData.syncedAt = Date.now();
          
          // Update cache
          const updatedResponse = new Response(JSON.stringify(scanData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
          
          await cache.put(request, updatedResponse);
          synced = true;
          syncCount++;
          break;
          
        } catch (error) {
          console.warn(`[SW] Sync attempt ${attempt} failed:`, error);
          if (attempt === maxRetries) {
            console.error('[SW] Max sync attempts reached for:', scanData.id);
          }
        }
      }
    }
    
    console.log(`[SW] Successfully synced ${syncCount} QR scans`);
    
    // Notify UI about sync completion
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'QR_SYNC_COMPLETE',
        syncCount: syncCount
      });
    });
    
  } catch (error) {
    console.error('[SW] QR sync failed:', error);
    
    // Notify UI about sync failure
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'QR_SYNC_ERROR',
        error: error.message
      });
    });
  }
}

// Push notifications (enhanced for QR scanner)
self.addEventListener('push', event => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  
  const options = {
    body: data.body || 'Nuevo escaneo QR sincronizado',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: data.tag || 'tinacom-notification',
    requireInteraction: true,
    data: data,
    actions: [
      {
        action: 'view',
        title: 'Ver',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close', 
        title: 'Cerrar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Tinacom', options)
  );
});

// Enhanced notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    const url = event.notification.data?.url || '/productos';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Utility functions
function isStaticAsset(url) {
  return url.includes('/items/') || 
         url.includes('.svg') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.webp') ||
         url.includes('.css') ||
         url.includes('.js');
}

async function syncQRScanData() {
  // Sync QR scan results when back online
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const qrData = await cache.match('/qr-scan-data');
    
    if (qrData) {
      console.log('[SW] Syncing QR scan data...');
      // Send to analytics or backend
      // Implementation depends on backend setup
    }
  } catch (error) {
    console.error('[SW] QR sync failed:', error);
  }
}

// Cache size management
async function cleanupCaches() {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const requests = await cache.keys();
  
  // Remove old entries if cache is too large (>50MB estimated)
  if (requests.length > 100) {
    const oldRequests = requests.slice(0, 20);
    await Promise.all(oldRequests.map(request => cache.delete(request)));
    console.log('[SW] Cache cleanup: removed', oldRequests.length, 'entries');
  }
}

// Run cleanup periodically
setInterval(cleanupCaches, 60000); // Every minute