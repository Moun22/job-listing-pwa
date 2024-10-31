const CACHE_NAME = "job-cache-v1";
const urlsToCache = ["/", "/css/styles.css", "/js/scripts.js"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }).catch((error) => {
            console.error("Failed to open cache:", error);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch((error) => {
            console.error("Failed to fetch resource:", error);
        })
    );
});

self.addEventListener("push", (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/img/logo.ico",
        data: { url: data.url }
    });
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || "http://localhost:3000";

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
        }).catch((error) => {
            console.error("Failed to open window:", error);
        })
    );
});