import { axiosInstance } from "../../services/axiosInstance";

export const getUsers = async (query) => {
    try {
        const res = await axiosInstance.get("/admin/users", { params: query });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
export const getUserDetails = async (id) => {
    try {
        const res = await axiosInstance.get(`/admin/users/${id}`);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const updateUserStatusAPI = async (id, data) => {
    try {
        const res = await axiosInstance.patch(`/admin/users/${id}`, data);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await axiosInstance.delete(`/admin/users/${id}`);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
