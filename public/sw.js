/* eslint-disable no-console */
const cacheName = 'spanion-v1';
const staticAssets = [
  './',
  './index.html',
  './app.js',
  './load.js',
  './images/',
  './assets/',
  './fonts/',
];

self.addEventListener('install', async event => {
  console.log('install event', event);
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
  console.log('fetch event', event);
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  return cachedResponse || fetch(req);
}
