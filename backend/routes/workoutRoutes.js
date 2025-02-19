const express = require("express");
const { getAllWorkouts, getWorkoutsByBodyPart, getWorkoutById, createWorkout, updateWorkout, deleteWorkout } = require("../controllers/workoutController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getAllWorkouts);
router.get("/bodypart/:bodyPart", getWorkoutsByBodyPart);
router.get("/id/:id", getWorkoutById);

// Admin Only Routes
router.post("/", authMiddleware, adminMiddleware, createWorkout);
router.put("/:id", authMiddleware, adminMiddleware, updateWorkout);
router.delete("/:id", authMiddleware, adminMiddleware, deleteWorkout);

module.exports = router;
