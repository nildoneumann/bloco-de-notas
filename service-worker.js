const CACHE = 'notas-pwa-v2';

const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {

  e.waitUntil(

    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))

  );

});

self.addEventListener('fetch', e => {

  e.respondWith(

    caches.match(e.request)
      .then(response => response || fetch(e.request))

  );

});
