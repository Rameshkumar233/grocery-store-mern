import { axiosInstance } from "../../services/axiosInstance";

export const fetchDashboardAPI = async (query) => {
    try {
        const res = await axiosInstance.get("/admin/dashboard");
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
