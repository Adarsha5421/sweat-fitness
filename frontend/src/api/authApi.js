import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Redirect to Google OAuth
export const googleLogin = () => {
  window.location.href = `${API_URL}/google`;
};

// Fetch user data with token
export const fetchUser = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Logout API
export const logoutUser = async () => {
  await axios.get(`${API_URL}/logout`);
};
