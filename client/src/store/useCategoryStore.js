import { create } from "zustand";
import { fetchCategoriesAPI } from "../services/categoryService";
import toast from "react-hot-toast";

export const useCategoryStore = create((set, get) => ({
    categories: [],
    selectedCategory: "all",
    setCategory: (category) => set({ selectedCategory: category }),
    loading: false,
    error: null,
    hasFetchedCategories: false,

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetchCategoriesAPI();
            set({ categories: res.categories, error: null });
        } catch (err) {
            set({ error: err.message });
            console.log("Failed to fetch categories", err.message);
        } finally {
            set({ loading: false, hasFetchedCategories: true });
        }
    },
}));
