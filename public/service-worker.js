const CACHE_NAME = "job-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/scripts.js",
  "/service-worker.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
  "/img/calculatrice.ico",
];

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache ouvert et fichiers ajoutés:", urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation du service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Cache supprimé:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Récupération des ressources depuis le cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
