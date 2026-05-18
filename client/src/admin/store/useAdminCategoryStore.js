import { create } from "zustand";
import * as api from "../../services/categoryService";
import toast from "react-hot-toast";

const useAdminCategoryStore = create((set, get) => ({
    categories: [],
    loading: false,
    error: null,
    hasFetchedCategories: false,
    totalCount: 0,

    fetchCategories: async (query) => {
        set({ loading: true, error: null });
        try {
            const res = await api.fetchCategoriesAPI(query);
            set({ categories: res.categories, totalCount: res.count, error: null });
        } catch (err) {
            set({ error: err.message });
            console.log("Failed to fetch categories", err.message);
        } finally {
            set({ loading: false, hasFetchedCategories: true });
        }
    },
    createCategory: async (payload) => {
        try {
            const res = await api.createCategoryAPI(payload);
            set((state) => ({
                categories: [...state.categories, res.category],
            }));
            toast.success(res.message);
            return res;
        } catch (err) {
            set({ error: err.message });
            toast.error(err.message);
        }
    },
    updateCategoryStatus: async (id, status) => {
        try {
            const res = await api.updateCategoryAPI(id, { isActive: status });
            set((state) => ({
                categories: state.categories.map((cat) => (cat._id === id ? { ...cat, isActive: status } : cat)),
            }));
            return res.success;
        } catch (err) {
            set({ error: err.message });
        }
    },
    updateCategory: async (id, payload) => {
        try {
            const res = await api.updateCategoryAPI(id, payload);
            set((state) => ({
                categories: state.categories.map((cat) => (cat._id === id ? { ...cat, ...res.category } : cat)),
            }));
            toast.success(res.message);
            return res.success;
        } catch (err) {
            set({ error: err.message });
            toast.error(err.message);
        }
    },
    deleteCategory: async (id) => {
        try {
            const res = await api.deleteCategoryAPI(id);
            set((state) => ({
                categories: state.categories.filter((cat) => cat._id !== id),
            }));
            toast.success(res.message);
            return res.success;
        } catch (err) {
            set({ error: err.message });
            console.log(err.message);
        }
    },
}));

export default useAdminCategoryStore;
