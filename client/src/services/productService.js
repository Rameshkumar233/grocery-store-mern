import { tr } from "zod/v4/locales";
import { axiosInstance } from "./axiosInstance";

export const fetchProductAPI = async (query) => {
    try {
        const res = await axiosInstance.get("/products", { params: query });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const fetchProductByIdAPI = async (productId) => {
    try {
        const res = await axiosInstance.get(`/products/${productId}`);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const createProductAPI = async (formData) => {
    try {
        const res = await axiosInstance.post("/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const updateProductAPI = async (id, data) => {
    try {
        const res = await axiosInstance.patch(`/products/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
export const deleteProductAPI = async (id) => {
    try {
        const res = await axiosInstance.delete(`/products/${id}`);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
