
# Gestion d’Annonces de Job - PWA avec Notifications Push

## Description du Projet

Ce projet est une Progressive Web App (PWA) permettant de consulter des annonces de job, de postuler en ligne, et de recevoir des notifications push. Elle utilise un service worker pour la mise en cache hors ligne, un fichier manifest pour une expérience native, et des notifications push sécurisées avec des clés VAPID pour informer les utilisateurs des nouvelles candidatures.

## Fonctionnalités

- **Liste d’annonces** : Consultez des offres d’emploi dynamiques.
- **Formulaire de candidature** : Postulez facilement via un formulaire intégré.
- **Notifications push** : Recevez une notification lorsque vous soumettez une candidature.
- **Mode hors-ligne** : Fonctionnalité assurée grâce au cache et service worker.

## Prérequis

- Node.js et npm doivent être installés.

## Installation

1. **Cloner le projet** :

    ```bash
    git clone <URL_du_projet>
    cd job-listing-pwa
    ```

2. **Installer les dépendances** :

    ```bash
    npm install
    ```

3. **Générer les clés VAPID** :  
   Les clés VAPID sont essentielles pour sécuriser les notifications. Utilisez la commande suivante pour générer de nouvelles clés VAPID :

    ```bash
    npx web-push generate-vapid-keys
    ```

   *Remarque* : Remplacez les valeurs de `publicVapidKey` et `privateVapidKey` dans `server.js` et `scripts.js` par les clés générées.

4. **Démarrer le serveur** :

    ```bash
    node server.js
    ```

5. **Ouvrir l’application** :  
   Rendez-vous sur [http://localhost:3000](http://localhost:3000) pour voir l’application.

## Structure des Fichiers

- `index.html` : Page principale avec la liste des annonces.
- `job-details.html` : Détails d’une annonce et formulaire de candidature.
- `service-worker.js` : Gère le cache et les notifications.
- `manifest.json` : Paramètres pour l’installation en tant que PWA.
- `server.js` : Serveur backend avec configuration des notifications push.
- `scripts.js` : Gestion des annonces et des fonctionnalités de notifications côté client.

## Configuration des Notifications Push

1. **Abonnement** : Les utilisateurs sont invités à s’abonner aux notifications push à l’ouverture de l’application.
2. **Envoi de Notification** : Lorsqu’une candidature est soumise, une notification est envoyée pour confirmer l’envoi.
3. **Personnalisation** : Les notifications sont configurées dans `service-worker.js` et `server.js` avec les options d’affichage et de timing.

## Utilisation des Clés VAPID

Les clés VAPID sont nécessaires pour les notifications sécurisées :

1. **Générez vos propres clés VAPID** avec la commande `npx web-push generate-vapid-keys`.
2. **Remplacez les valeurs `publicVapidKey` et `privateVapidKey` dans** :
    - `server.js` : pour sécuriser l’envoi de notifications.
    - `scripts.js` : pour s’assurer que l’abonnement du client est sécurisé.

### Exemple de Modification dans server.js

```javascript
const publicVapidKey = 'VOTRE_CLE_PUBLIQUE';
const privateVapidKey = 'VOTRE_CLE_PRIVEE';

webpush.setVapidDetails(
  'mailto:votre_email@example.com',
  publicVapidKey,
  privateVapidKey
);
```

## Test des Notifications

1. **Autoriser les Notifications** : Assurez-vous que les notifications sont autorisées pour localhost dans votre navigateur.
2. **Tester les Candidatures** : Soumettez une candidature pour vérifier la réception de la notification.

## Mise en Cache et Mode Hors-Ligne

Le fichier `service-worker.js` gère la mise en cache et le fonctionnement hors-ligne de l’application. Voici les principaux éléments mis en cache :

```javascript
return cache.addAll([
  "/",
  "/css/styles.css",
  "/js/scripts.js",
  "/img/logo.ico",
]);
```

## Auteurs

- **Cyrille FRANCK** : [cyrille.franck@supdevinci-edu.fr](mailto:cyrille.franck@supdevinci-edu.fr)
- **Mohamed Lezhari KHORISSI** : [mohamed-lezhari.khorissi@supdevinci-edu.fr](mailto:mohamed-lezhari.khorissi@supdevinci-edu.fr)
- **Victoria ORUBA** : [victoria.oruba@supdevinci-edu.fr](mailto:victoria.oruba@supdevinci-edu.fr)
- **Hugo VRIGNAUD** : [hugo.vrignaud@supdevinci-edu.fr](mailto:hugo.vrignaud@supdevinci-edu.fr)


Ce projet est fait par l’équipe M1 DEV de SUPDEVINCI


