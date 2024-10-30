self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("job-cache").then((cache) => {
      return cache.addAll(["/", "/css/styles.css", "/js/scripts.js"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/img/logo.ico",
  });
});
