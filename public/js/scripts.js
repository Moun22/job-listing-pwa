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
