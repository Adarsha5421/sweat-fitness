import { create } from "zustand";
import { fetchUser, logoutUser, updateUserProfile } from "../api/authApi";

const useAuthStore = create((set) => ({
  user: null,

  // ✅ Fetch user data from API
  loadUser: async () => {
    try {
      const data = await fetchUser();
      set({ user: data.user });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },

  // Update user data (make sure this is defined)
  updateUser: async (updatedData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    try {
      const updatedUser = await updateUserProfile(token, updatedData); // API call
      set({ user: updatedUser.user });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  },

  // ✅ Logout function
  logout: async () => {
    await logoutUser();
    set({ user: null });
  },
}));

export default useAuthStore;
