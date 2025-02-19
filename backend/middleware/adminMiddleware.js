const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      console.error("🚨 No user ID found in request:", req.user);
      return res.status(401).json({ error: "Unauthorized: No valid user ID" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }

    console.log("✅ Admin Access Granted:", user.email);
    next(); // Proceed if admin
  } catch (err) {
    console.error("🚨 Admin Middleware Error:", err);
    res.status(500).json({ error: "Server error in adminMiddleware" });
  }
};

module.exports = adminMiddleware;
