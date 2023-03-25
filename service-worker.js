const CACHE_NAME = 'services-app-cache';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll([
          '/',
          '/src/pages/index.js',
          '/src/pages/dashboard.js',
          '/offline.html'
        ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(function() {
        return caches.match('/offline.html');
      })
  );
});
