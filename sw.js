const CACHE = 'hackeros-offline-v2';
const OFFLINE_URL = 'offline.html';
const NOT_FOUND_URL = '404.html';
const LOGO_URL = 'HackerOS.png';
const PRECACHE = [OFFLINE_URL, NOT_FOUND_URL, 'offline-dialog.js', LOGO_URL];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Nawigacja (otwarcie strony): sieć, a gdy jej brak -> offline.html
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() =>
        caches.open(CACHE).then((c) => c.match(OFFLINE_URL))
          .then((r) => r || caches.match(NOT_FOUND_URL))
          .then((r) => r || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }))
      )
    );
    return;
  }

  // Logo (obrazek) – z sieci, a offline z cache. Zapytania fetch() (np. ping łączności)
  // NIE są przechwytywane, więc zawsze pokazują prawdziwy stan sieci.
  if (req.destination === 'image' && new URL(req.url).pathname.endsWith('/' + LOGO_URL)) {
    e.respondWith(fetch(req).catch(() => caches.match(LOGO_URL)));
  }
});
