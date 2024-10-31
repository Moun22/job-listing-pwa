const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

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

// Configuration de VAPID
const publicVapidKey =
  "BD5mKbhDQU8y5KmsqwOYQnIs3yhOY7VwdNEswhMY872Xf4z8HbgWOMAKXPeXSmnTHSWOWJvSxhfxj6CMw9fQAZ0";
const privateVapidKey = "MjvvNM4Mz0D1pUIWyRS1rAgiJAQLpLpn7cxlwKdI5G0";

const subscriptions = [];

webpush.setVapidDetails(
  "mailto:exemple@votre-email.com",
  publicVapidKey,
  privateVapidKey
);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Route d'abonnement aux notifications
app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  subscription.expirationTime = expirationDate;

  const authTokens = [];
  subscriptions.forEach(element => {
    authTokens.push(element.keys.auth)
  });
  

  if(!(authTokens.includes(subscription.keys.auth))){
    console.log("Souscription non enregistrée, enregistrement")
    subscriptions.push(subscription);
    webpush
    .sendNotification(subscription, welcomePayload, options)
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la notification:", error);
    });
  }

  if(authTokens.includes(subscription.keys.auth)){
    console.log("Souscription deja enregistrée");
  }

  // console.log(subscriptions);
  //enregistrement coté serveur de la subscription

  subscriptions.push(subscription);
  res.status(201).json({});

  // Message de notification de bienvenue
  const welcomePayload = JSON.stringify({
    title: "Bienvenue !",
    body: "Vous recevrez des notifications pour les nouveaux jobs!",
    url: "http://localhost:3000",
  });

  const options = {
    TTL: 24 * 60 * 60,
  };

  // Envoi de notifications toutes les 10 secondes
  setInterval(() => {
    sendJobNotification();
  }, 10000);
});

// Fonction pour envoyer une notification de nouveau job
function sendJobNotification() {
  const jobId = Math.floor(Math.random() * jobs.length); // ID aléatoire entre 0 et 7 (pour l'index)
  const job = jobs[jobId]; // Récupérer le job correspondant à l'index aléatoire
  const payload = JSON.stringify({
    title: "Nouvelle Opportunité!",
    body: `Un nouveau job qui pourrait vous intéresser a été posté : ${job.title}`, // Utilisez le titre du job
    url: `http://localhost:3000/job-details.html?index=${jobId}`, // Renvoie vers le job avec l'index
  });

  // Options pour l'envoi de notification
  const options = {
    TTL: 24 * 60 * 60, // Durée en secondes
  };

  subscriptions.forEach((subscription) => {
    webpush.sendNotification(subscription, payload, options).catch((error) => {
      console.error("Erreur lors de l'envoi de la notification:", error);
    });
  });
}

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);


async function sendNewNotification(payload){
  await Promise.all(subscriptions.map(async (sub) => {
    try {
      await webpush.sendNotification(sub, payload); // throws if not successful
      console.log("Notif envoyée")
    } catch (err) {
      console.log(sub.endpoint, '->', err.message);
      // TODO: Delete subscription (e.g. from db)
    }
  }));
}

setTimeout(()=> {
  sendNewNotification('Test Notification')}, 10000)