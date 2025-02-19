const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bodyPart: { type: String, enum: ["Chest", "Arms", "Back", "Legs", "Abs", "Shoulders"], required: true },
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    equipment: String,
    instructions: String,
    videoUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
