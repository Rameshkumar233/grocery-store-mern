import { axiosInstance } from "./axiosInstance";

export const fetchCartAPI = async () => {
    try {
        const res = await axiosInstance.get("/cart");
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const addToCartAPI = async (productId) => {
    try {
        const res = await axiosInstance.post("/cart/add", { productId });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const updateCartAPI = async (productId, action) => {
    try {
        const res = await axiosInstance.post("/cart/update", { productId, action });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const mergeCartAPI = async (items) => {
    try {
        const res = await axiosInstance.post("/cart/merge", items);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const removeItemAPI = async (productId) => {
    try {
        const res = await axiosInstance.post("/cart/remove", { productId });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const clearCartAPI = async () => {
    try {
        const res = await axiosInstance.delete("/cart/clear");
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
