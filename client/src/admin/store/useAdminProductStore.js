import { create } from "zustand";
import * as api from "../../services/productService";
import toast from "react-hot-toast";

const useAdminProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    hasFetchedProducts: false,
    totalCount: 0,

    fetchProducts: async (query) => {
        set({ loading: true, error: null });
        try {
            const res = await api.fetchProductAPI(query);
            set({ products: res.products, totalCount: res.count, error: null });
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
    createProduct: async (payload) => {
        try {
            const res = await api.createProductAPI(payload);
            set((state) => ({
                products: [...state.products, res.product],
            }));
            toast.success(res.message);
            return res;
        } catch (err) {
            set({ error: err.message });
            toast.error(err.message);
        }
    },

    updateProductStatus: async (id, status) => {
        try {
            const res = await api.updateProductAPI(id, { isActive: status });
            set((state) => ({
                products: state.products.map((p) => (p._id === id ? { ...p, isActive: status } : p)),
            }));
            return res.success;
        } catch (err) {
            set({ error: err.message });
        }
    },
    updateProduct: async (id, payload) => {
        try {
            const res = await api.updateProductAPI(id, payload);
            set((state) => ({
                products: state.products.map((p) => (p._id === id ? { ...p, ...res.product } : p)),
            }));
            toast.success(res.message);
            return res.success;
        } catch (err) {
            set({ error: err.message });
            toast.error(err.message);
        }
    },

    deleteProduct: async (id) => {
        try {
            const res = await api.deleteProductAPI(id);
            set((state) => ({
                products: state.products.filter((p) => p._id !== id),
            }));
            toast.success(res.message);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    },
}));

export default useAdminProductStore;
