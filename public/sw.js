// Joseph Vergara Portfolio - Progressive Web App Service Worker
const CACHE_NAME = 'jv-portfolio-v1';

const CORE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/icon.svg',
  '/apple-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
];

const STATIC_EXT_REGEX = /\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff|woff2|ttf|eot|pdf)$/i;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Precache core shell assets
      for (const asset of CORE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('[SW] Precache skipped for:', asset, err);
        }
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      ),
      self.clients.claim(),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Never cache contact API or any internal API routes
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Handle same-origin requests
  if (url.origin === self.location.origin) {
    // 1. Navigation requests (HTML pages): Network-first with offline fallback to cached '/'
    if (request.mode === 'navigate') {
      event.respondWith(
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(async () => {
            const cachedPage = await caches.match(request);
            if (cachedPage) return cachedPage;
            const fallback = await caches.match('/');
            if (fallback) return fallback;
            return new Response('Offline - Joseph Vergara Portfolio', {
              status: 503,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
          })
      );
      return;
    }

    // 2. Static assets (_next/static, images, fonts, pdfs): Stale-While-Revalidate
    const isStaticAsset =
      url.pathname.startsWith('/_next/static/') ||
      STATIC_EXT_REGEX.test(url.pathname);

    if (isStaticAsset) {
      event.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
          const cachedResponse = await cache.match(request);
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        })
      );
      return;
    }
  }

  // Default: Stale-while-revalidate for static CDN fonts or other GET assets
  if (STATIC_EXT_REGEX.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
