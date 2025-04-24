const CACHE_NAME = 'farmease-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/home.css',
  '/css/style.css',
  '/css/dark-mode.css',
  '/css/navigation.css',
  '/css/chatbot.css',
  '/js/script.js',
  '/js/navigation.js',
  '/js/chatbot.js',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
}); 