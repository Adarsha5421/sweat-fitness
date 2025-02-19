const express = require("express");
const { googleAuth, googleAuthCallback, setCookieAndRedirect, getCurrentUser, logout, updateUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback, setCookieAndRedirect);
router.get("/me", getCurrentUser);
router.put("/profile", authMiddleware, updateUserProfile);
router.get("/logout", logout);

module.exports = router;
