const CACHE = 'hackeros-offline-v1';
const OFFLINE_URL = '404.html';
const PRECACHE = [OFFLINE_URL, 'HackerOS.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.open(CACHE).then((c) => c.match(OFFLINE_URL))
    )
  );
});
