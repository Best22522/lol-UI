// lcu-proxy.js
const express = require("express");
const https = require("https");
const cors = require("cors");
const { authenticate } = require("league-connect");

const app = express();
app.use(cors());

let credentials = null;

const fetchSession = async () => {
  if (!credentials) {
    credentials = await authenticate();
  }

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "127.0.0.1",
        port: credentials.port,
        path: "/lol-champ-select/v1/session",
        method: "GET",
        rejectUnauthorized: false,
        headers: {
          Authorization: `Basic ${Buffer.from(`riot:${credentials.password}`).toString("base64")}`,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on("error", reject);
    req.end();
  });
};

app.get("/api/draft", async (req, res) => {
  try {
    const session = await fetchSession();
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🔗 LCU Proxy running at http://localhost:${PORT}`));
