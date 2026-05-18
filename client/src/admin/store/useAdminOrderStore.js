import { create } from "zustand";
import { getAllOrdersAPI } from "../../services/orderSevice";

export const useAdminOrderStore = create((set) => ({
    orders: [],
    loading: false,

    fetchOrders: async (query) => {
        set({ loading: true });

        try {
            const res = await getAllOrdersAPI(query);
            set({ orders: res.orders });
        } catch (err) {
            console.error(err);
        } finally {
            set({ loading: false });
        }
    },
}));
