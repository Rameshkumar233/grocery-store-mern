import { axiosInstance } from "./axiosInstance";

export const createOrderAPI = async (orderData) => {
    try {
        const res = await axiosInstance.post("/orders", { orderData });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const fetchMyOrdersAPI = async () => {
    try {
        const res = await axiosInstance.get("/orders/my");
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

// Admin
export const getAllOrdersAPI = async (query) => {
    try {
        const res = await axiosInstance.get("/orders", { params: query });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const updateOrderStatusAPI = (id, status) => {
    return axios.put(`/api/admin/orders/${id}/status`, { status });
};

export const orderPaymentStatusAPI = async (orderId, paymentResult) => {
    try {
        const res = await axiosInstance.post("/payment/status", { orderId, paymentResult });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};

export const cancelOrderAPI = async (id, reason) => {
    try {
        const res = await axiosInstance.post(`/order/cancel/${id}`, { reason });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        throw new Error(message);
    }
};
