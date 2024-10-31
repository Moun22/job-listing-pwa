const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Clés VAPID
const publicVapidKey = 'BHHzzuDIb1aXvuwYv4kKLZ0xUAmhPCL9TY5FFBVyXDfGtiOEK8japyHgBUYmrt6I1GvsIehjfq9OgW28SxiwV8o';
const privateVapidKey = 'uUYhA7YQD74EOpoCcEPUJ9NVSprMFfhMG4fW-QfzU_0';

webpush.setVapidDetails('mailto:example@example.com', publicVapidKey, privateVapidKey);

// Route pour gérer les abonnements
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'Nouvelle Offre d’Emploi!',
    body: 'Une nouvelle offre d’emploi est disponible. Consultez-la maintenant !'
  });

  webpush.sendNotification(subscription, payload).catch(error => console.error(error));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
