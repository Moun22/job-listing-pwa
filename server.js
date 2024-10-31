const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Configuration de VAPID
const publicVapidKey =
  "BD5mKbhDQU8y5KmsqwOYQnIs3yhOY7VwdNEswhMY872Xf4z8HbgWOMAKXPeXSmnTHSWOWJvSxhfxj6CMw9fQAZ0";
const privateVapidKey = "MjvvNM4Mz0D1pUIWyRS1rAgiJAQLpLpn7cxlwKdI5G0";

// Remplacez `audience` par une adresse `mailto:`
webpush.setVapidDetails(
  "mailto:exemple@votre-email.com",
  publicVapidKey,
  privateVapidKey
);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Route d'abonnement aux notifications
app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures
  subscription.expirationTime = expirationDate;

  res.status(201).json({});

  // Message de notification
  const payload = JSON.stringify({
    title: "Nouvelle Notification!",
    body: "Clique ici pour ouvrir l'application",
    url: "http://localhost:3000",
  });

  // Définir la TTL pour une durée de 24 heures
  const options = {
    TTL: 24 * 60 * 60, // Durée en secondes (24 heures)
  };

  // Envoie de la notification push
  webpush.sendNotification(subscription, payload, options).catch((error) => {
    console.error("Erreur lors de l'envoi de la notification:", error);
  });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
