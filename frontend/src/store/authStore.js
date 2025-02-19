import { create } from "zustand";
import { fetchUser, logoutUser, updateUserProfile } from "../api/authApi";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null, // ✅ Store token in state

  // ✅ Load user data from API
  loadUser: async () => {
    const token = localStorage.getItem("token"); // ✅ Ensure token is used
    if (!token) {
      console.warn("🚨 No token found in localStorage");
      return;
    }

    try {
      const data = await fetchUser(token);
      set({ user: data.user, token });
    } catch (error) {
      console.error("🚨 Failed to fetch user:", error);
      set({ user: null, token: null });
      localStorage.removeItem("token");
    }
  },

  // ✅ Update user profile
  updateUser: async (updatedData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("🚨 No token found when updating user.");
      return;
    }

    try {
      const updatedUser = await updateUserProfile(token, updatedData);
      set({ user: updatedUser.user });
    } catch (error) {
      console.error("🚨 Failed to update user:", error);
    }
  },

  // ✅ Set token after login
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
