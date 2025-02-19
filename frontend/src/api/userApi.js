import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Fetch user profile
export const fetchUserProfile = async (token) => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update user profile
export const updateUserProfile = async (token, updatedData) => {
  const res = await axios.put(`${API_URL}/profile`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
