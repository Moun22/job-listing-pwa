const publicVapidKey =
  "BD5mKbhDQU8y5KmsqwOYQnIs3yhOY7VwdNEswhMY872Xf4z8HbgWOMAKXPeXSmnTHSWOWJvSxhfxj6CMw9fQAZ0";

// Demande de permission pour les notifications
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    subscribeUserToPush();
  }
});

async function subscribeUserToPush() {
  const registration = await navigator.serviceWorker.ready;
  const applicationServerKey = urlBase64ToUint8Array(publicVapidKey);
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey,
  });

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("Utilisateur inscrit aux notifications.");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Exemple d'annonces de jobs
const jobs = [
  {
    title: "Développeur Full-Stack",
    company: "Tech Corp",
    location: "Paris, France",
    description: "Responsable du développement des applications web...",
  },
  {
    title: "Designer UI/UX",
    company: "Creative Solutions",
    location: "Lyon, France",
    description: "Création et optimisation des interfaces utilisateurs...",
  },
];

// Fonction pour charger les annonces de job dans la page
function loadJobList() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = ""; // Vide la liste

  jobs.forEach((job, index) => {
    const jobElement = document.createElement("div");
    jobElement.classList.add("job");

    jobElement.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company} - ${job.location}</p>
      <button onclick="toggleDetails(${index})">Voir les détails</button>
      <div class="details hidden" id="details-${index}">
        <p>${job.description}</p>
        <button onclick="openForm('${job.title}')">Candidater</button>
      </div>
    `;

    jobList.appendChild(jobElement);
  });
}

// Fonction pour afficher/masquer les détails d'un job
function toggleDetails(index) {
  const details = document.getElementById(`details-${index}`);
  details.classList.toggle("hidden");
}

// Fonction pour afficher le formulaire de candidature
function openForm(jobTitle) {
  const formContainer = document.getElementById("applyFormContainer");
  formContainer.classList.remove("hidden");

  // Affiche le titre du job dans le formulaire
  const formTitle = document.getElementById("applyFormTitle");
  formTitle.textContent = `Candidature pour le poste de ${jobTitle}`;
}

// Fonction pour fermer le formulaire de candidature
function closeForm() {
  const formContainer = document.getElementById("applyFormContainer");
  formContainer.classList.add("hidden");
}

// Écouteur pour la soumission du formulaire de candidature
document.getElementById("applyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Candidature envoyée avec succès !");
  closeForm();
});

// Charger les annonces au démarrage
window.onload = loadJobList;
