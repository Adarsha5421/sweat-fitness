const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Google OAuth Login
exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Google OAuth Callback
exports.googleAuthCallback = passport.authenticate("google", { failureRedirect: "http://localhost:3000/" });

exports.setCookieAndRedirect = async (req, res) => {
  try {
    if (!req.user || !req.user.token) {
      return res.redirect("http://localhost:3000/login?error=Authentication Failed");
    }

    // Use the token already generated in `passport.js`
    const token = req.user.token;
    console.log("✅ Using Token from Passport:", token);

    // Set token in cookie (optional)
    res.cookie("token", token, { httpOnly: true, secure: false });

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/profile?token=${token}`); // ✅ Fix: Redirect to `/profile`
  } catch (error) {
    console.error("OAuth Error:", error);
    res.redirect("http://localhost:3000/login?error=Server Error");
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    console.log("📌 Received Token in Backend:", token); // ✅ Debugging log

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("🚨 JWT Verification Error:", error);
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    console.log("🔍 Decoded Token in Backend:", decoded); // ✅ Debugging log

    if (!decoded.id) {
      return res.status(403).json({ error: "Invalid token: No user ID found" });
    }

    const user = await User.findById(decoded.id).select("-googleId");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user, token });
  } catch (error) {
    console.error("🚨 Error Fetching User:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  req.logout(() => {
    res.status(200).json({ message: "Logged Out" });
  });
};
