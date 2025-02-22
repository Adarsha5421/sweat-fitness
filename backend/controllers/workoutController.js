const Workout = require("../models/Workout");

// Get all workouts
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
};

// Get workouts by body part
exports.getWorkoutsByBodyPart = async (req, res) => {
  try {
    const { bodyPart } = req.params;
    const workouts = await Workout.find({ bodyPart });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
};

// Get a single workout
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workout" });
  }
};

// Create a new workout (Admin Only)
exports.createWorkout = async (req, res) => {
  try {
    const { name, bodyPart, difficulty, equipment, instructions, videoUrl } = req.body;

    const newWorkout = new Workout({
      name,
      bodyPart,
      difficulty,
      equipment,
      instructions,
      videoUrl,
    });

    await newWorkout.save();
    res.status(201).json({ message: "Workout added successfully", workout: newWorkout });
  } catch (error) {
    res.status(500).json({ error: "Failed to add workout" });
  }
};

// Delete a workout (Admin Only)
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete workout" });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const { name, bodyPart, difficulty, equipment, instructions, videoUrl } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, { name, bodyPart, difficulty, equipment, instructions, videoUrl }, { new: true, runValidators: true });

    if (!updatedWorkout) {
      console.error("Workout not found:", req.params.id);
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json({ message: "Workout updated successfully", workout: updatedWorkout });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ error: "Failed to update workout" });
  }
};
