// ParikshaSathi — Service Worker
// Offline-first caching for PWA support

const CACHE_NAME = 'pariksha-sathi-v6';
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

// ── Push Notification handler ─────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'ParikshaSathi';
  const options = {
    body: data.body || 'Aaj ka study session complete karo!',
    icon: '/pariksha-sathi/logo.png',
    badge: '/pariksha-sathi/favicon.svg',
    tag: data.tag || 'ps-reminder',
    data: { url: data.url || '/pariksha-sathi/' },
    actions: [
      { action: 'open', title: '📚 Plan Dekho' },
      { action: 'dismiss', title: 'Baad mein' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = event.notification.data?.url || '/pariksha-sathi/';
  event.waitUntil(clients.openWindow(url));
});

// ── Schedule local daily reminders ───────────────────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SCHEDULE_NOTIFS') {
    const { examDate, userName, exam, slots } = event.data;

    // Show immediate confirmation notification
    self.registration.showNotification('🔔 ParikshaSathi Notifications ON!', {
      body: `${userName ? userName + ', ' : ''}daily study reminders set ho gaye!`,
      icon: '/pariksha-sathi/logo.png',
      badge: '/pariksha-sathi/favicon.svg',
      tag: 'ps-notif-confirm',
    });

    // Exam countdown reminder (if exam date available)
    if (examDate) {
      const exam_dt = new Date(examDate);
      const now = new Date();
      const daysLeft = Math.ceil((exam_dt - now) / 86400000);
      if (daysLeft > 0 && daysLeft <= 30) {
        setTimeout(() => {
          self.registration.showNotification(`⏰ ${daysLeft} din baaki!`, {
            body: `${exam.toUpperCase()} exam mein sirf ${daysLeft} din bache hain. Aaj ka plan complete karo!`,
            icon: '/pariksha-sathi/logo.png',
            tag: 'ps-countdown',
            data: { url: '/pariksha-sathi/' }
          });
        }, 3000);
      }
    }

    // Schedule slot-wise 15-min-before notifications for today's slots
    if (slots && slots.length) {
      const now = new Date();
      const SLOT_HOURS = {
        early_morning: 4, morning: 6, forenoon: 9,
        afternoon: 12, evening: 15, night: 20,
        revision: 19, current: 7,
      };
      slots.forEach((slot, idx) => {
        const hour = SLOT_HOURS[slot.slotType] || 8;
        const notifTime = new Date();
        notifTime.setHours(hour, 0, 0, 0);
        notifTime.setMinutes(notifTime.getMinutes() - 15); // 15 min before
        const delay = notifTime - now;
        if (delay > 0 && delay < 86400000) {
          setTimeout(() => {
            self.registration.showNotification(`📚 ${slot.subject || 'Study'} — 15 min mein!`, {
              body: slot.topic || 'Aaj ka study session shuru hone wala hai!',
              icon: '/pariksha-sathi/logo.png',
              badge: '/pariksha-sathi/favicon.svg',
              tag: `ps-slot-${idx}`,
              data: { url: '/pariksha-sathi/' },
              actions: [
                { action: 'open', title: '📚 Plan Dekho' },
                { action: 'dismiss', title: 'Baad mein' }
              ]
            });
          }, delay);
        }
      });
    }
    return;
  }

  // Streak break alert check
  if (event.data?.type === 'CHECK_STREAK') {
    const { streak, userName } = event.data;
    if (streak === 0) {
      self.registration.showNotification('🔥 Streak khatam hone wali hai!', {
        body: `${userName || 'Yaar'}, 2 din se kuch tick nahi hua. Aaj thoda padh lo — streak wapas shuru karo!`,
        icon: '/pariksha-sathi/logo.png',
        badge: '/pariksha-sathi/favicon.svg',
        tag: 'ps-streak-alert',
        data: { url: '/pariksha-sathi/' },
        actions: [{ action: 'open', title: '📚 Abhi Padho' }]
      });
    }
  }
});
