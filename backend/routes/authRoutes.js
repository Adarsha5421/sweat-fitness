const express = require("express");
const {
  googleAuth,
  googleAuthCallback,
  setCookieAndRedirect,
  getCurrentUser,
  logout,
  updateUserProfile,
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Google OAuth Routes
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback, setCookieAndRedirect);

// ✅ Email & Password Authentication
router.post("/signup", register);
router.post("/login", login);

// ✅ User Profile
router.get("/me", authMiddleware, getCurrentUser);
router.put("/profile", authMiddleware, updateUserProfile);

// ✅ Password Recovery
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ✅ Logout
router.get("/logout", logout);

module.exports = router;
