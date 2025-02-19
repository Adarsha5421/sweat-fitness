import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

// ✅ Helper function to include the Authorization token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Fetch all workouts
export const fetchWorkouts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Fetch single workout by ID
export const fetchWorkoutById = async (id) => {
  const res = await axios.get(`${API_URL}/id/${id}`); // ✅ Matches backend route
  return res.data;
};

// Fetch workouts by body part ✅ Updated route
export const fetchWorkoutsByBodyPart = async (bodyPart) => {
  const res = await axios.get(`${API_URL}/bodypart/${bodyPart}`); // ✅ Matches backend route
  return res.data;
};

// ✅ Create a new workout (Admin Only)
export const createWorkout = async (token, workoutData) => {
  const res = await axios.post(API_URL, workoutData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// ✅ Update an existing workout (Admin Only)
export const updateWorkout = async (workoutId, updatedData) => {
  const res = await axios.put(`${API_URL}/${workoutId}`, updatedData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// ✅ Delete a workout (Admin Only)
export const deleteWorkout = async (workoutId) => {
  const res = await axios.delete(`${API_URL}/${workoutId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
