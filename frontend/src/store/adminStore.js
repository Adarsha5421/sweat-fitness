import { create } from "zustand";
import { fetchAllUsers, updateUserRole, deleteUser } from "../api/adminApi";

const useAdminStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  // Load all users
  loadUsers: async (token) => {
    set({ loading: true });
    try {
      const data = await fetchAllUsers(token);
      console.log(data);

      set({ users: data, loading: false });
    } catch (error) {
      set({ error: "Failed to load users", loading: false });
    }
  },

  // Update user role
  changeUserRole: async (token, userId, role) => {
    try {
      await updateUserRole(token, userId, role);
      set((state) => ({
        users: state.users.map((user) => (user._id === userId ? { ...user, role } : user)),
      }));
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  },

  // Delete a user
  removeUser: async (token, userId) => {
    try {
      await deleteUser(token, userId);
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  },
}));

export default useAdminStore;
