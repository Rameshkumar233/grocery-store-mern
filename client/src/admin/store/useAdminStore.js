import { create } from "zustand";
import { fetchDashboardAPI } from "../services/adminDashboardAPI";

export const useAdminStore = create((set) => ({
    dashboard: null,
    loadingDashboard: false,

    fetchDashboard: async () => {
        try {
            set({ loadingDashboard: true });
            const res = await fetchDashboardAPI("/admin/dashboard");
            set({ dashboard: res });
        } catch (err) {
            console.log("Failed to get dashboard", err.message);
        } finally {
            set({ loadingDashboard: false });
        }
    },
}));
