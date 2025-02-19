const express = require("express");
const { getUserProfile, updateUserProfile, getAllUsers, updateUserRole, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// User Profile Routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

// Admin Routes
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.put("/:id/role", authMiddleware, adminMiddleware, updateUserRole);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
