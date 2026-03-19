const CACHE_PREFIX = 'pariksha-sathi';
const CACHE = `${CACHE_PREFIX}-v2026-03-19`;
const APP_SHELL = [
  '/pariksha-sathi/',
  '/pariksha-sathi/index.html',
  '/pariksha-sathi/app.js',
  '/pariksha-sathi/style.css',
  '/pariksha-sathi/logo.svg',
  '/pariksha-sathi/logo.png',
  '/pariksha-sathi/favicon.svg',
  '/pariksha-sathi/manifest.json',
  '/pariksha-sathi/notification-prompt.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(`${CACHE_PREFIX}-`) && key !== CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  if (event.data?.type === 'SCHEDULE_NOTIFS') {
    const { examDate, userName, exam, slots } = event.data;

    self.registration.showNotification('ParikshaSathi Notifications ON!', {
      body: `${userName ? `${userName}, ` : ''}daily study reminders set ho gaye!`,
      icon: '/pariksha-sathi/logo.png',
      badge: '/pariksha-sathi/favicon.svg',
      tag: 'ps-notif-confirm'
    });

    if (examDate) {
      const examDateValue = new Date(examDate);
      const now = new Date();
      const daysLeft = Math.ceil((examDateValue - now) / 86400000);
      if (daysLeft > 0 && daysLeft <= 30) {
        setTimeout(() => {
          self.registration.showNotification(`${daysLeft} din baaki!`, {
            body: `${String(exam || '').toUpperCase()} exam mein sirf ${daysLeft} din bache hain. Aaj ka plan complete karo!`,
            icon: '/pariksha-sathi/logo.png',
            tag: 'ps-countdown',
            data: { url: '/pariksha-sathi/' }
          });
        }, 3000);
      }
    }

    if (slots && slots.length) {
      const now = new Date();
      const slotHours = {
        early_morning: 4,
        morning: 6,
        forenoon: 9,
        afternoon: 12,
        evening: 15,
        night: 20,
        revision: 19,
        current: 7
      };
      slots.forEach((slot, index) => {
        const hour = slotHours[slot.slotType] || 8;
        const notifTime = new Date();
        notifTime.setHours(hour, 0, 0, 0);
        notifTime.setMinutes(notifTime.getMinutes() - 15);
        const delay = notifTime - now;
        if (delay > 0 && delay < 86400000) {
          setTimeout(() => {
            self.registration.showNotification(`${slot.subject || 'Study'} - 15 min mein!`, {
              body: slot.topic || 'Aaj ka study session shuru hone wala hai!',
              icon: '/pariksha-sathi/logo.png',
              badge: '/pariksha-sathi/favicon.svg',
              tag: `ps-slot-${index}`,
              data: { url: '/pariksha-sathi/' },
              actions: [
                { action: 'open', title: 'Plan Dekho' },
                { action: 'dismiss', title: 'Baad mein' }
              ]
            });
          }, delay);
        }
      });
    }
    return;
  }

  if (event.data?.type === 'CHECK_STREAK') {
    const { streak, userName } = event.data;
    if (streak === 0) {
      self.registration.showNotification('Streak khatam hone wali hai!', {
        body: `${userName || 'Yaar'}, 2 din se kuch tick nahi hua. Aaj thoda padh lo - streak wapas shuru karo!`,
        icon: '/pariksha-sathi/logo.png',
        badge: '/pariksha-sathi/favicon.svg',
        tag: 'ps-streak-alert',
        data: { url: '/pariksha-sathi/' },
        actions: [{ action: 'open', title: 'Abhi Padho' }]
      });
    }
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, '/pariksha-sathi/index.html'));
    return;
  }

  const url = new URL(request.url);
  if (APP_SHELL.includes(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'ParikshaSathi';
  const options = {
    body: data.body || 'Aaj ka study session complete karo!',
    icon: '/pariksha-sathi/logo.png',
    badge: '/pariksha-sathi/favicon.svg',
    tag: data.tag || 'ps-reminder',
    data: { url: data.url || '/pariksha-sathi/' },
    actions: [
      { action: 'open', title: 'Plan Dekho' },
      { action: 'dismiss', title: 'Baad mein' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = event.notification.data?.url || '/pariksha-sathi/';
  event.waitUntil(clients.openWindow(url));
});

async function networkFirst(request, fallbackAsset) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return (await cache.match(request)) || (await cache.match(fallbackAsset));
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const fresh = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fresh;
}
