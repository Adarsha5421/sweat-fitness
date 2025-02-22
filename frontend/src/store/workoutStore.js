import { create } from "zustand";
import { fetchWorkouts, fetchWorkoutById, createWorkout, updateWorkout, deleteWorkout, fetchWorkoutsByBodyPart } from "../api/workoutApi";

const useWorkoutStore = create((set) => ({
  workouts: [],
  selectedWorkout: null,
  loading: false,
  error: null,

  // Fetch all workouts
  loadWorkouts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWorkouts();
      set({ workouts: data, loading: false });
    } catch (error) {
      set({ error: "Error fetching workouts. Please try again.", loading: false });
    }
  },

  // Fetch single workout details
  loadWorkoutDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWorkoutById(id);
      set({ selectedWorkout: data, loading: false });
    } catch (error) {
      set({ error: "Failed to load workout details.", loading: false });
    }
  },

  // Fetch workouts by body part
  filterByBodyPart: async (bodyPart) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWorkoutsByBodyPart(bodyPart);
      set({ workouts: data, loading: false });
    } catch (error) {
      set({ error: `No workouts found for ${bodyPart}.`, loading: false });
    }
  },

  // Create a new workout
  addWorkout: async (token, workoutData) => {
    set({ loading: true, error: null });
    try {
      const newWorkout = await createWorkout(token, workoutData);
      set((state) => ({ workouts: [...state.workouts, newWorkout.workout], loading: false }));
    } catch (error) {
      console.error("Failed to create workout:", error);
    }
  },

  // Delete a workout
  removeWorkout: async (token, workoutId) => {
    set({ loading: true, error: null });
    try {
      await deleteWorkout(workoutId);
      set((state) => ({
        workouts: state.workouts.filter((w) => w._id !== workoutId),
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  },

  // Reset all filters
  resetFilters: async () => {
    try {
      const data = await fetchWorkouts();
      set({ workouts: data, loading: false });
    } catch (error) {
      set({ error: "Error resetting filters.", loading: false });
    }
  },

  editWorkout: async (token, workoutId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedWorkout = await updateWorkout(workoutId, updatedData);
      set((state) => ({
        workouts: state.workouts.map((w) => (w._id === workoutId ? updatedWorkout.workout : w)),
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to update workout:", error);
    }
  },
}));

export default useWorkoutStore;
