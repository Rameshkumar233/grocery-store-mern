import { create } from "zustand";
import * as api from "../services/adminUserAPI";

const useAdminUserStore = create((set, get) => ({
    users: [],
    totalUsers: 0,
    selectedUser: null,
    loading: false,

    fetchUsers: async (query) => {
        try {
            set({ loading: true });
            const res = await api.getUsers(query);
            set({
                users: res.users,
                totalUsers: res.total,
            });
        } catch (err) {
            console.log("Failed to get users", err.message);
        } finally {
            set({ loading: false });
        }
    },

    fetchUserDetails: async (id) => {
        set({ loading: true });

        try {
            const res = await api.getUserDetails(id);
            set({ selectedUser: res.user });
        } catch (err) {
            console.log("Failed to get user", err.message);
        } finally {
            set({ loading: false });
        }
    },

    updateUserStatus: async (id, data) => {
        try {
            const updatedUser = await api.updateUserStatusAPI(id, data);
            set((state) => ({
                users: state.users.map((u) => (u._id === id ? { ...u, ...updatedUser } : u)),
            }));
        } catch (err) {
            console.log("Failed to update user", err.message);
        }
    },

    deleteUser: async (id) => {
        try {
            await api.deleteUser(id);
            set((state) => ({
                users: state.users.filter((u) => u._id !== id),
            }));
        } catch {
            console.log("Failed to delete user", err.message);
        }
    },
}));

export default useAdminUserStore;
