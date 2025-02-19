const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    profilePic: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    age: Number,
    weight: Number,
    height: Number,
    fitnessGoal: { type: String, enum: ["Lose Weight", "Gain Muscle", "Maintain"], default: "Maintain" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
