import { create } from "zustand";
import { fetchUser, logoutUser, emailLogin, emailSignup, forgotPassword } from "../api/authApi";
import { updateUserProfile } from "../api/userApi";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  // ✅ Load user data from API
  loadUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("🚨 No token found in localStorage");
      return;
    }

    try {
      const data = await fetchUser();
      set({ user: data.user, token });
    } catch (error) {
      console.error("🚨 Failed to fetch user:", error);
      set({ user: null, token: null });
      localStorage.removeItem("token");
    }
  },

  // ✅ Email & Password Login
  login: async (credentials) => {
    try {
      const data = await emailLogin(credentials);
      set({ user: data.user, token: data.token });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("🚨 Login failed:", error);
      throw error;
    }
  },

  // ✅ Email & Password Signup
  signup: async (userData) => {
    try {
      await emailSignup(userData);
    } catch (error) {
      console.error("🚨 Signup failed:", error);
      throw error;
    }
  },

  // ✅ Forgot Password
  forgotPassword: async (email) => {
    try {
      await forgotPassword(email);
    } catch (error) {
      console.error("🚨 Forgot password request failed:", error);
      throw error;
    }
  },
  // ✅ Update User Profile (Text Fields + Profile Picture)
  updateUser: async (updatedData, profileImage = null) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("🚨 No token found when updating user.");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach((key) => {
        formData.append(key, updatedData[key]); // Append text fields
      });

      if (profileImage) {
        formData.append("profilePic", profileImage); // Append profile picture if provided
      }

      const updatedUser = await updateUserProfile(formData); // Send full update in one request
      set({ user: updatedUser.user });

      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("🚨 Failed to update user:", error);
      alert("❌ Failed to update profile.");
    }
  },

  // ✅ Set Token after login
  setToken: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken });
  },

  // ✅ Logout function
  logout: async () => {
    await logoutUser();
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
