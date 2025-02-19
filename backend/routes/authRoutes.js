const express = require("express");
const { googleAuth, googleAuthCallback, setCookieAndRedirect, getCurrentUser, logout } = require("../controllers/authController");

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback, setCookieAndRedirect);
router.get("/me", getCurrentUser);
router.get("/logout", logout);

module.exports = router;
