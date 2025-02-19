import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

// Fetch all workouts
export const fetchWorkouts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Fetch single workout by ID
export const fetchWorkoutById = async (id) => {
  const res = await axios.get(`${API_URL}/id/${id}`);
  return res.data;
};

// Create a new workout (Admin Only)
export const createWorkout = async (token, workoutData) => {
  const res = await axios.post(API_URL, workoutData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update an existing workout (Admin Only)
export const updateWorkout = async (token, workoutId, updatedData) => {
  const res = await axios.put(`${API_URL}/${workoutId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete a workout (Admin Only)
export const deleteWorkout = async (token, workoutId) => {
  const res = await axios.delete(`${API_URL}/${workoutId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
