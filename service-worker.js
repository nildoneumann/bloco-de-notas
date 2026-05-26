const CACHE = 'notas-pwa-v2';

self.addEventListener('install', e => {

  self.skipWaiting();

  e.waitUntil(

    caches.open(CACHE).then(cache => {

      return cache.addAll([
        './',
        './index.html',
        './manifest.json'
      ]);

    })

  );

});

self.addEventListener('activate', e => {

  e.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE){
            return caches.delete(key);
          }

        })

      );

    })

  );

  self.clients.claim();

});

self.addEventListener('fetch', e => {

  e.respondWith(

    fetch(e.request)
      .catch(() => caches.match(e.request))

  );

});
