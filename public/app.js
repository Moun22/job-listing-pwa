// Vérifier que le navigateur prend en charge les Service Workers
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker enregistré avec succès:', registration);
        })
        .catch(error => console.log('Échec de l’enregistrement du Service Worker:', error));
}

// Fonction pour afficher un message de confirmation
function showSubscriptionMessage(message) {
    const confirmation = document.createElement('div');
    confirmation.className = 'subscription-confirmation';
    confirmation.textContent = message;
    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.remove();
    }, 3000); // Message disparaît après 3 secondes
}

// Abonnement aux notifications push
document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.createElement('button');
    subscribeButton.innerText = 'Recevoir les alertes emploi';
    subscribeButton.classList.add('btn', 'btn-primary', 'my-3');

    subscribeButton.addEventListener('click', async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BHHzzuDIb1aXvuwYv4kKLZ0xUAmhPCL9TY5FFBVyXDfGtiOEK8japyHgBUYmrt6I1GvsIehjfq9OgW28SxiwV8o' // Votre clé VAPID publique
            });

            await fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            showSubscriptionMessage('Abonnement aux notifications réussi !');
        } catch (error) {
            console.error('Erreur lors de l’abonnement aux notifications push:', error);
            showSubscriptionMessage('Erreur lors de l’abonnement.');
        }
    });

    document.querySelector('.container').appendChild(subscribeButton);
});
