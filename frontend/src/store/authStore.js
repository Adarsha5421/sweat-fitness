import { create } from "zustand";
import { fetchUser, logoutUser } from "../api/authApi";

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

  // ✅ Logout function
  logout: async () => {
    await logoutUser();
    set({ user: null });
  },
}));

export default useAuthStore;
