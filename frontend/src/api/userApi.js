import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Fetch user profile
export const fetchUserProfile = async (token) => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Update User Profile (Handles Text Fields + Profile Picture in ONE Request)
export const updateUserProfile = async (formData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.put(`${API_URL}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ Ensure correct content type
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
