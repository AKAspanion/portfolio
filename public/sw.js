// The site used to register a caching service worker. This replacement
// removes it from browsers that still have it: it clears the old caches and
// unregisters itself. Keep it at this URL until old visitors have cycled out.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
    })(),
  );
});
