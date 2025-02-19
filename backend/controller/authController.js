const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Google OAuth Login
exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Google OAuth Callback
exports.googleAuthCallback = passport.authenticate("google", { failureRedirect: "http://localhost:3000/" });

exports.setCookieAndRedirect = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect("http://localhost:3000/login?error=Authentication Failed");
    }

    // Generate JWT token
    const token = jwt.sign({ id: req.user._id, name: req.user.name, email: req.user.email, profilePic: req.user.profilePic }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set token in cookie (optional)
    res.cookie("token", token, { httpOnly: true, secure: false });

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  } catch (error) {
    console.error("OAuth Error:", error);
    res.redirect("http://localhost:3000/login?error=Server Error");
  }
};

// Get Current User (Fix JWT Extraction)
exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-googleId");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user, token });
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  req.logout(() => {
    res.status(200).json({ message: "Logged Out" });
  });
};
