import { create } from "zustand";
import { cancelOrderAPI, createOrderAPI, fetchMyOrdersAPI, orderPaymentStatusAPI } from "../services/orderSevice";
import { success } from "zod";
import toast from "react-hot-toast";

export const useOrderStore = create((set, get) => ({
    orders: [],
    currentOrder: null,
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    loading: false,
    error: null,

    placeOrder: async (orderData) => {
        try {
            set({ loading: true, error: null });
            const res = await createOrderAPI(orderData);
            set((state) => ({ currentOrder: res.order, orders: [...state.orders, res.order] }));
            set({
                itemsPrice: res.order.itemsPrice,
                shippingPrice: res.order.shippingPrice,
                totalPrice: res.order.totalPrice,
            });
            toast.success(res.message);
            return res.success;
        } catch (err) {
            set({ error: err.message, loading: false });
            console.error("Failed to create order", err);
        } finally {
            set({ loading: false });
        }
    },

    fetchMyOrders: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetchMyOrdersAPI();
            set({ orders: res.orders });
            return res.orders;
        } catch (err) {
            set({ error: err.message, loading: false });
            console.error("Failed to get myorders", err);
        } finally {
            set({ loading: false });
        }
    },

    payOrder: async (orderId, paymentResult) => {
        set({ loading: true, error: null });
        try {
            const updated = await orderPaymentStatusAPI(orderId, paymentResult);
            set((state) => ({ currentOrder: updated, orders: state.orders.map((order) => (order._id === id ? updated : order)) }));
        } catch (err) {
            set({ error: err.message, loading: false });
            console.error("Failed to get payment status", err);
        } finally {
            set({ loading: false });
        }
    },
    cancelOrder: async (id, reason) => {
        set({ loading: true, error: null });
        try {
            const updated = await cancelOrderAPI(id, reason);
            set((state) => ({ currentOrder: updated, orders: state.orders.map((order) => (order._id === id ? updated : order)) }));
        } catch (err) {
            set({ error: err.message, loading: false });
            console.error("Failed to cancel order", err);
        } finally {
            set({ loading: false });
        }
    },
}));
