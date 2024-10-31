// Ajouter une annonce de job dynamiquement dans la liste
function addJobToList(title, description) {
    const jobList = document.getElementById('jobList');
    const jobItem = document.createElement('div');
    jobItem.classList.add('job-item');
    jobItem.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <button onclick="openApplyForm()">Postuler</button>
  `;
    jobList.appendChild(jobItem);
}

// Exemple d'ajout de job
addJobToList('Développeur Web', 'Nous recherchons un développeur web qualifié.');

// Ouvrir et fermer le formulaire de candidature
function openApplyForm() {
    document.getElementById('applyFormContainer').classList.remove('hidden');
}

function closeForm() {
    document.getElementById('applyFormContainer').classList.add('hidden');
}

// Gestion de l'abonnement aux notifications push
async function subscribeToPush() {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BHHzzuDIb1aXvuwYv4kKLZ0xUAmhPCL9TY5FFBVyXDfGtiOEK8japyHgBUYmrt6I1GvsIehjfq9OgW28SxiwV8o'
        });

        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Abonnement aux notifications push réussi.');
    } catch (error) {
        console.error('Erreur lors de l’abonnement aux notifications push:', error);
    }
}

// Ajoutez un bouton pour s'abonner aux notifications
document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.createElement('button');
    subscribeButton.innerText = 'Recevoir les alertes emploi';
    subscribeButton.classList.add('btn', 'btn-primary', 'my-3');
    subscribeButton.onclick = subscribeToPush;
    document.querySelector('.container').appendChild(subscribeButton);
});
