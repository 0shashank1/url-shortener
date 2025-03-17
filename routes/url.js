const express = require("express");

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  deleteShortId,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);


router.delete("/delete/:id", deleteShortId);

module.exports = router;