const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

const publicVapidKey = "BGrOoLtWECWBQCCoeKjLLoL-1RVLkrJJ00pV_02629NycueUevsptijCp8F-m_GZMy6I3ZF-Tc4TO-mXdtX1irY";
const privateVapidKey = "Q4fYZO2R0VCCLs9x53n52HHH5qo_Bvu10ZLki6PPY0g";

webpush.setVapidDetails(
    "mailto:example@your-email.com",
    publicVapidKey,
    privateVapidKey
);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: "New Notification!",
    body: "Click here to open the application",
    url: "http://localhost:3000",
  });

  const options = {
    TTL: 24 * 60 * 60,
  };

  webpush.sendNotification(subscription, payload, options).catch((error) => {
    console.error("Error sending notification:", error);
  });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));