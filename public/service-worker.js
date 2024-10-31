self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('job-listing-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/js/scripts.js',
                '/img/logo.ico'
            ]);
        })
    );
    console.log('Service Worker installé et cache créé.');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(error => {
                console.error('Erreur lors de la récupération de la ressource:', error);
                throw error;
            });
        })
    );
});


self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Notification push reçue:', data); // Log pour confirmer la réception de notification
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/img/logo.ico'
        })
    );
});
