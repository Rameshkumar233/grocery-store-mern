import { axiosInstance } from "./axiosInstance";

export const fetchCategoriesAPI = async (query) => {
    try {
        const res = await axiosInstance.get("/categories", { params: query });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const createCategoryAPI = async (formData) => {
    try {
        const res = await axiosInstance.post("/categories", formData, {
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
export const updateCategoryAPI = async (id, data) => {
    try {
        const res = await axiosInstance.patch(`/categories/${id}`, data, {
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

export const deleteCategoryAPI = async (id) => {
    try {
        const res = await axiosInstance.delete(`/categories/${id}`);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
