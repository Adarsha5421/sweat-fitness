import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Google OAuth Login (Redirect)
export const googleLogin = () => {
  window.location.href = `${API_URL}/google`;
};

// Fetch user data with token ✅ Ensure token is sent correctly
export const fetchUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Add updateUserProfile function
export const updateUserProfile = async (token, updatedData) => {
  const res = await axios.put(`${API_URL}/profile`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Logout API
export const logoutUser = async () => {
  localStorage.removeItem("token"); // ✅ Remove token on logout
  await axios.get(`${API_URL}/logout`);
};
