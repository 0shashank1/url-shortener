const express = require("express");
const { 
    handleUserSignup, 
    handleUserLogin, 
    handleLogout, 
    handleEditProfile,
    handleUpdateUserName,
    handleupdateUserPassword
} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/logout", handleLogout );
router.get("/editprofile", handleEditProfile);
router.post("/updateUserName", handleUpdateUserName);
router.post("/updateUserPassword", handleupdateUserPassword);
module.exports = router;