// ParikshaSathi — Service Worker
// Offline-first caching for PWA support

const CACHE_NAME = 'pariksha-sathi-v3';
const ASSETS = [
  '/pariksha-sathi/',
  '/pariksha-sathi/index.html',
  '/pariksha-sathi/app.js',
  '/pariksha-sathi/style.css',
  '/pariksha-sathi/logo.svg',
  '/pariksha-sathi/logo.png',
  '/pariksha-sathi/favicon.svg',
  '/pariksha-sathi/manifest.json',
];

// Install: cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for assets, network-first for navigation
self.addEventListener('fetch', event => {
  const { request } = event;
  // Skip non-GET and cross-origin
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => {
        // Offline fallback for navigation
        if (request.mode === 'navigate') return caches.match('/pariksha-sathi/index.html');
      });
    })
  );
});
