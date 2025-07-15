require("dotenv").config();
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.render("home",{
    user: req.user,
    error: "URL required"
  });
  const url = body.url;
  if(!url.startsWith("https://")){
    return res.render("home",{
      user: req.user,
      error: "invalid URL"
    });
  }
  const isthere = await URL.findOne({ 
    createdBy: req.user._id, 
    redirectURL:  body.url,
  });
  if(isthere){
    return res.render("home", {
      id: isthere.shortId,
      name: req.cookies.name,
      base_url: process.env.base_url

    });
  }
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortID,
    name: req.cookies.name,
    PORT: process.env.PORT

  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}


async function deleteShortId (req, res) {
  try {
    await URL.findOneAndDelete({shortId : req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  deleteShortId,
};