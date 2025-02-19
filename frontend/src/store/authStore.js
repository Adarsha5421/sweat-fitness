import { create } from "zustand";
import { fetchUserProfile, updateUserProfile } from "../api/userApi";
import { logoutUser } from "../api/authApi";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  // Set user & token
  setUser: async (token) => {
    if (!token) return;

    localStorage.setItem("token", token);

    try {
      const userData = await fetchUserProfile(token);
      set({ user: userData.user, token });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },

  // Update user fitness data
  updateUser: async (token, updatedData) => {
    try {
      const res = await updateUserProfile(token, updatedData);
      set({ user: res.user });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  },

  // Logout function
  logout: async () => {
    await logoutUser();
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
