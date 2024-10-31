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
    id: 1,
    title: "Développeur Full-Stack",
    company: "Tech Corp",
    location: "Paris, France",
    description: "Responsable du développement des applications web...",
  },
  {
    id: 2,
    title: "Designer UI/UX",
    company: "Creative Solutions",
    location: "Lyon, France",
    description: "Création et optimisation des interfaces utilisateurs...",
  },
  {
    id: 3,
    title: "Chef de Projet IT",
    company: "Innovatech",
    location: "Marseille, France",
    description: "Gestion des projets informatiques de bout en bout...",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "DataWorks",
    location: "Nantes, France",
    description:
      "Analyse et interprétation des données pour aider à la prise de décision...",
  },
  {
    id: 5,
    title: "Ingénieur DevOps",
    company: "Cloudify",
    location: "Toulouse, France",
    description:
      "Mise en place des pipelines CI/CD et gestion des infrastructures cloud...",
  },
  {
    id: 6,
    title: "Consultant Cybersécurité",
    company: "SecureTech",
    location: "Nice, France",
    description:
      "Évaluation et renforcement de la sécurité des systèmes d'information...",
  },
  {
    id: 7,
    title: "Product Owner",
    company: "Agile Solutions",
    location: "Bordeaux, France",
    description:
      "Définition des priorités et gestion du backlog produit en collaboration avec l'équipe de développement...",
  },
  {
    id: 8,
    title: "Ingénieur Machine Learning",
    company: "AI Labs",
    location: "Grenoble, France",
    description:
      "Développement et optimisation de modèles de machine learning...",
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
        <button onclick="toggleApplyForm(${index})">Candidater</button>
        <div id="applyForm-${index}" class="applyForm hidden">
          <h4>Formulaire de Candidature</h4>
          <form id="form-${index}">
            <label for="applicantName">Nom :</label>
            <input type="text" id="applicantName" required />

            <label for="applicantEmail">Email :</label>
            <input type="email" id="applicantEmail" required />

            <label for="coverLetter">Lettre de motivation :</label>
            <textarea id="coverLetter" required></textarea>

            <button type="submit">Envoyer la Candidature</button>
            <button type="button" onclick="toggleApplyForm(${index})">Annuler</button>
          </form>
        </div>
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

// Fonction pour afficher/masquer le formulaire de candidature
function toggleApplyForm(index) {
  const applyForm = document.getElementById(`applyForm-${index}`);
  applyForm.classList.toggle("hidden");

  // Écouteur pour la soumission du formulaire de candidature
  const form = document.getElementById(`form-${index}`);
  form.onsubmit = function (e) {
    e.preventDefault();
    alert("Candidature envoyée avec succès !");
    toggleApplyForm(index); // Ferme le formulaire après soumission
  };
}

// Charger les annonces au démarrage
window.onload = loadJobList;
