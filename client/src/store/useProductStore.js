import { create } from "zustand";
import * as api from "../services/productService";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
    products: [],
    selectedProduct: null,
    search: "",
    sort: "latest",
    loading: false,
    error: null,
    hasFetchedProducts: false,

    setSearch: (query) => set({ search: query }),
    setSort: (method) => set({ sort: method }),

    fetchProducts: async (query) => {
        set({ loading: true, error: null });
        try {
            const data = await api.fetchProductAPI(query);
            set({ products: data.products, error: null });
        } catch (err) {
            set({ error: err?.message || "Failed to fetch products" });
            console.error("Failed to fetch products", err);
        } finally {
            set({ loading: false, hasFetchedProducts: true });
        }
    },

    fetchProductById: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await api.fetchProductByIdAPI(id);
            set({ selectedProduct: data.product, error: null });
            return data;
        } catch (err) {
            set({ error: err?.message || "Failed to fetch product" });
            console.error("Failed to fetch product", err);
        } finally {
            set({ loading: false });
        }
    },
}));
