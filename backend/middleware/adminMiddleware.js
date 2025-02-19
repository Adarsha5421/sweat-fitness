const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }

    next(); // Proceed if admin
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = adminMiddleware;
