const {
  tiktokInfo,
  instagramInfo,
  spotifyInfo,
  twitterInfo,
} = require("./functionInfo.js");

const express = require("express");
const api = express();

const warning = "woy isikan ?url= njirr";

api.get("/", (req, res) => {
  res.json({
    info: ["/tiktok", "/instagram", "/spotify", "/twitter"],
  });
});

api.get("/tiktok", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(500).send(warning);
  }

  const info = await tiktokInfo(url);
  res.json(info);
});

api.get("/instagram", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(500).send(warning);
  }

  const info = await instagramInfo(url);
  res.json(info);
});

api.get("/spotify", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(500).send(warning);
  }

  const info = await spotifyInfo(url);
  res.json(info);
});

api.get("twitter", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(500).send(warning);
  }

  const info = await twitterInfo(url);
  res.json(info);
});

const PORT = 3000;
api.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
