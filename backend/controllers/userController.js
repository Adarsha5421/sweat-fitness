const User = require("../models/User");
const fs = require("fs");
const path = require("path");

// Get logged-in user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-googleId"); // Remove Google ID for security
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile (age, weight, height, fitnessGoal, profilePic)
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, age, weight, height, fitnessGoal } = req.body;

    // Ensure user exists
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // **Validate input fields**
    if (age && isNaN(age)) return res.status(400).json({ error: "Invalid age" });
    if (weight && isNaN(weight)) return res.status(400).json({ error: "Invalid weight" });
    if (height && isNaN(height)) return res.status(400).json({ error: "Invalid height" });

    // **Update user details if provided**
    if (name) user.name = name;
    if (age) user.age = Number(age);
    if (weight) user.weight = Number(weight);
    if (height) user.height = Number(height);
    if (fitnessGoal) user.fitnessGoal = fitnessGoal.trim();

    // **Handle profile picture upload (if applicable)**
    if (req.file) {
      // Remove old profile picture if it exists
      if (user.profilePic) {
        const oldPicPath = path.join(__dirname, "..", user.profilePic);
        if (fs.existsSync(oldPicPath)) {
          fs.unlinkSync(oldPicPath);
        }
      }

      // Store new profile picture
      user.profilePic = `${req.file.filename}`;
    }

    // Save user updates
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-googleId");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Admin: Update User Role
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Admin: Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
