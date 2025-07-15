require("dotenv").config();
const express = require("express");
const URL = require("../models/url");
const {handleResetPassword } = require("../controllers/user");

const router = express.Router();

router.get("/myurls", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("myurls", {
    urls: allurls,
    name: req.cookies.name,
    PORT: process.env.PORT
  });
});

router.get("/", (req, res) => {
  if (!req.user) return res.redirect("/login");
  return res.render("home", {
    name: req.cookies.name,
    PORT: process.env.PORT
  });
})


router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/forgot", (req, res) => {
  return res.render("reset");
});
router.post("/reset", handleResetPassword );
module.exports = router;