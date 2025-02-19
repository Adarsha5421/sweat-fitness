const User = require("../models/User");

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

// Update user profile (age, weight, height, fitnessGoal)
exports.updateUserProfile = async (req, res) => {
  try {
    const { age, weight, height, fitnessGoal } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update fields if provided
    if (age) user.age = age;
    if (weight) user.weight = weight;
    if (height) user.height = height;
    if (fitnessGoal) user.fitnessGoal = fitnessGoal;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
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
