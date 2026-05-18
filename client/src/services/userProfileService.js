import { axiosInstance } from "./axiosInstance";

export const updateProfileAPI = async (profileData) => {
    try {
        const res = await axiosInstance.patch("/user/profile", profileData);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
export const saveAddressAPI = async (addressData) => {
    try {
        const res = await axiosInstance.patch("/user/address/save", addressData);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const deleteAddressAPI = async (id) => {
    try {
        const res = await axiosInstance.delete(`/user/address/${id}`);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
