import { create } from "zustand";
import { addToCartAPI, clearCartAPI, fetchCartAPI, removeItemAPI, updateCartAPI, mergeCartAPI } from "../services/cartService.js";
import toast from "react-hot-toast";

const loadGuestCart = () => {
    try {
        const data = localStorage.getItem("guest-cart");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const saveGuestCart = (cart) => {
    try {
        localStorage.setItem("guest-cart", JSON.stringify(cart));
    } catch (err) {
        console.error("Failed to get guest cart", err);
    }
};

export const useCartStore = create((set, get) => ({
    cart: loadGuestCart() || [],
    discount: 0,
    dicountedTotal: 0,
    isLoggedIn: false,
    loading: false,
    error: null,

    getGuestCart: () => loadGuestCart(),

    normalizedCart: (items) => {
        const normalized = items.map((item) => ({
            productId: item.product._id,
            price: item.price,
            quantity: item.quantity,
            product: item.product,
        }));
        return normalized;
    },

    fetchCart: async () => {
        set({ loading: true, error: null });
        try {
            const data = await fetchCartAPI();
            const normalized = get().normalizedCart(data.items) || [];
            set({ cart: normalized, loading: false, isLoggedIn: true });
        } catch (err) {
            if (err.response?.status === 401) {
                set({ cart: loadGuestCart(), isLoggedIn: false });
            }
            console.error("Fetch cart failed", err);
            set({ error: err.response?.data?.message, loading: false });
        }
    },

    addToCart: async (product) => {
        const prevCart = get().cart;
        const exists = prevCart.find((item) => item.productId === product._id);
        if (exists) return;
        const updatedCart = [...prevCart, { productId: product._id, quantity: 1, price: product.price, product }];
        set({ cart: updatedCart });
        if (!get().isLoggedIn) {
            saveGuestCart(updatedCart);
            return;
        }
        try {
            const data = await addToCartAPI(product._id);
            set({ cart: get().normalizedCart(data.items) });
        } catch (err) {
            set({ error: err.response?.data?.message });
        }
    },

    increaseQty: async (productId) => {
        const prevCart = get().cart;
        const updatedCart = prevCart.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item));
        set({ cart: updatedCart });
        if (!get().isLoggedIn) {
            saveGuestCart(updatedCart);
            return;
        }
        try {
            const data = await updateCartAPI(productId, "increase");
            set({ cart: get().normalizedCart(data.items) });
        } catch (err) {
            console.error("Failed to increase", err);
            set({ error: err.message });
        }
    },

    decreaseQty: async (productId) => {
        const prevCart = get().cart;
        const updatedCart = prevCart.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0);
        set({ cart: updatedCart });
        if (!get().isLoggedIn) {
            saveGuestCart(updatedCart);
            return;
        }
        try {
            const data = await updateCartAPI(productId, "decrease");
            set({ cart: get().normalizedCart(data.items) });
        } catch (err) {
            console.error("Failed to decrease", err);
            set({ error: err.message });
        }
    },

    removeItem: async (productId) => {
        const prevCart = get().cart;
        const updatedCart = prevCart.filter((item) => item.productId !== productId);
        set({ cart: updatedCart });
        if (!get().isLoggedIn) {
            saveGuestCart(updatedCart);
            toast.success("Item removed from cart");
            return;
        }
        try {
            const data = await removeItemAPI(productId);
            set({ cart: get().normalizedCart(data.items) });
            toast.success("Item removed from cart");
        } catch (err) {
            console.error("Failed to remove item", err);
            set({ cart: prevCart, error: err.message });
        }
    },

    mergeCart: async () => {
        const guestCart = loadGuestCart();
        if (!guestCart.length) return;

        try {
            const normalized = guestCart.map((item) => ({
                productId: item.product._id,
                quantity: item.quantity,
            }));
            const data = await mergeCartAPI(normalized);

            set({
                cart: get().normalizedCart(data.items),
                isLoggedIn: true,
            });

            localStorage.removeItem("guest-cart");
        } catch (err) {
            console.error("Failed to merge cart", err);
            set({ error: err.message });
        }
    },

    clearCart: async () => {
        if (!get().isLoggedIn) {
            localStorage.removeItem("guest-cart");
            set({ cart: [] });
            return;
        }
        try {
            await clearCartAPI();
            set({ cart: [] });
        } catch (err) {
            console.error("Failed to remove item", err);
            set({ error: err.message });
        }
    },
}));
