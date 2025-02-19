import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Fetch all users (Admin Only)
export const fetchAllUsers = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update user role (Admin Only)
export const updateUserRole = async (token, userId, role) => {
  const res = await axios.put(`${API_URL}/${userId}/role`, { role }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

// Delete user (Admin Only)
export const deleteUser = async (token, userId) => {
  const res = await axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
