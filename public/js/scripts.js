const publicVapidKey = "BGrOoLtWECWBQCCoeKjLLoL-1RVLkrJJ00pV_02629NycueUevsptijCp8F-m_GZMy6I3ZF-Tc4TO-mXdtX1irY";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("Service Worker registered"))
        .catch((error) => console.error("Service Worker registration failed:", error));
  });
}

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    subscribeUserToPush();
  }
});

function showNotification() {
  if (Notification.permission === "granted") {
    const options = {
      body: "Application submitted successfully!",
      icon: "/path/to/check-icon.png",
    };
    new Notification("Notification", options);
  }
}

async function subscribeUserToPush() {
  try {
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

    console.log("User subscribed to notifications.");
  } catch (error) {
    console.error("Failed to subscribe user:", error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const jobs = [
  // Job listings...
];

function loadJobList() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  jobs.forEach((job, index) => {
    const jobElement = document.createElement("div");
    jobElement.classList.add("job");

    jobElement.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company} - ${job.location}</p>
      <button onclick="viewJobDetails(${index})">View Details</button>
      <div class="details hidden" id="details-${index}">
        <p>${job.description}</p>
        <button onclick="toggleApplyForm(${index})">Apply</button>
      </div>
    `;

    jobList.appendChild(jobElement);
  });
}

function viewJobDetails(index) {
  window.location.href = `job-details.html?index=${index}`;
}

function toggleApplyForm(index) {
  const applyForm = document.getElementById(`applyForm-${index}`);
  applyForm.classList.toggle("hidden");

  const form = document.getElementById(`form-${index}`);
  form.onsubmit = function (e) {
    e.preventDefault();
    alert("Application submitted successfully!");
    showNotification();
    toggleApplyForm(index);
  };
}

window.onload = loadJobList;