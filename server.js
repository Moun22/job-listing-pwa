const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Configuration de VAPID
const publicVapidKey =
  "BGrOoLtWECWBQCCoeKjLLoL-1RVLkrJJ00pV_02629NycueUevsptijCp8F-m_GZMy6I3ZF-Tc4TO-mXdtX1irY";
const privateVapidKey = "Q4fYZO2R0VCCLs9x53n52HHH5qo_Bvu10ZLki6PPY0g";

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
