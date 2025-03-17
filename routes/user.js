const express = require("express");
const { handleUserSignup, handleUserLogin, handleLogout } = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/logout", handleLogout )

module.exports = router;