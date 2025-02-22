import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// ✅ Google OAuth Login
export const googleLogin = () => {
  window.location.href = `${API_URL}/google`;
};

// ✅ Email & Password Login
export const emailLogin = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

// ✅ Email & Password Signup
export const emailSignup = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
};

// ✅ Forgot Password Request
export const forgotPassword = async (email) => {
  const res = await axios.post(`${API_URL}/forgot-password`, { email });
  return res.data;
};

// ✅ Fetch User Data
export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Update User Profile (Including Profile Picture)
export const updateUserProfile = async (updatedData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.put(`${API_URL}/profile`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Upload Profile Picture
export const uploadProfilePicture = async (formData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(`${API_URL}/upload-profile-pic`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Logout API
export const logoutUser = async () => {
  localStorage.removeItem("token");
  await axios.get(`${API_URL}/logout`);
};
