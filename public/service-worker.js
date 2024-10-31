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

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Vérifie si l'URL est présente dans les données de notification
  const urlToOpen = event.notification.data?.url || "http://localhost:3000";

  // Ouvre l'URL spécifiée ou l'URL par défaut
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
