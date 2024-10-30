if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission().then((permission) => {
      // On affiche ou non le bouton en fonction de la réponse
      notificationBtn.style.display =
        permission === "granted" ? "none" : "block";
    });
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker enregistré avec succès:", registration);
      })
      .catch((error) => {
        console.error("Échec de l'enregistrement du Service Worker:", error);
      });
  });
}

// Variables globales
// Eléments mémoire et écran
const memoireElt = document.querySelector("#memoire");
const ecranElt = document.querySelector("#ecran");

// On stocke la valeur de l'écran "précédent"
let precedent = 0;

// On stocke l'affichage
let affichage = "";

// On stocke l'opération
let operation = null;

// On initialise la mémoire
let memoire;

window.onload = () => {
  // On écoute les clics sur les touches
  let touches = document.querySelectorAll("span");

  for (let touche of touches) {
    touche.addEventListener("click", gererTouches);
  }

  // On écoute les touches du clavier
  document.addEventListener("keydown", gererTouches);

  // Récupération de la mémoire depuis le stockage local
  memoire = localStorage.memoire ? parseFloat(localStorage.memoire) : 0;
  if (memoire !== 0) memoireElt.style.display = "initial";
};

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const jobList = document.getElementById("jobList");
  const applyFormContainer = document.getElementById("applyFormContainer");
  const applyForm = document.getElementById("applyForm");

  // Liste d'annonces de jobs (exemple)
  const jobs = [
    {
      title: "Développeur Web",
      details: "Responsable du développement de sites web.",
      id: 1,
    },
    {
      title: "Designer Graphique",
      details: "Création de designs visuels et logos.",
      id: 2,
    },
    {
      title: "Chef de Projet",
      details: "Gestion des projets et des équipes.",
      id: 3,
    },
  ];

  // Afficher les annonces de jobs
  jobs.forEach((job) => addJobToList(job));

  // Fonction pour ajouter une annonce dans la liste
  function addJobToList(job) {
    const jobItem = document.createElement("div");
    jobItem.className = "job-item";

    jobItem.innerHTML = `
      <h2>${job.title}</h2>
      <button onclick="toggleDetails(${job.id})">Voir Détails</button>
      <div id="details-${job.id}" class="job-details">
        <p>${job.details}</p>
        <button onclick="apply(${job.id})">Candidater</button>
      </div>
    `;

    jobList.appendChild(jobItem);
  }

  // Afficher ou masquer les détails d'un job
  window.toggleDetails = function (id) {
    const detailsElement = document.getElementById(`details-${id}`);
    detailsElement.style.display =
      detailsElement.style.display === "none" ? "block" : "none";
  };

  // Ouvrir le formulaire de candidature
  window.apply = function (id) {
    applyFormContainer.classList.remove("hidden");
  };

  // Fermer le formulaire de candidature
  window.closeForm = function () {
    applyFormContainer.classList.add("hidden");
  };

  // Soumettre le formulaire de candidature
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Candidature envoyée avec succès !");
    applyForm.reset();
    closeForm();
  });
});
