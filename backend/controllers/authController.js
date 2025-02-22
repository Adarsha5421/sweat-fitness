const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("🚨 JWT Verification Error:", error);
      return res.status(403).json({ error: "Invalid or expired token" });
    }

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

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, fitnessGoal, age, weight, height } = req.body; // Update allowed fields
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (fitnessGoal) user.fitnessGoal = fitnessGoal;
    if (age) user.age = age;
    if (weight) user.weight = weight;
    if (height) user.height = height;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  req.logout(() => {
    res.status(200).json({ message: "Logged Out" });
  });
};

// **Generate JWT**
const generateToken = (user) => {
  return jwt.sign({ id: user._id, name: user.name, email: user.email, profilePic: user.profilePic }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// **📌 Email/Password Sign-Up**
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({ message: "User registered successfully", user, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Registration failed" });
  }
};

// **📌 Email/Password Login**
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// **📌 Forgot Password**
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    // **Send Email**
    const transporter = nodemailer.createTransport({ service: "Gmail", auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS } });
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: "Error sending reset email" });
  }
};

// **📌 Reset Password**
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Password reset failed" });
  }
};
