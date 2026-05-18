import toast from "react-hot-toast";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance";
import { useCartStore } from "../store/useCartStore";
import { mergeCartAPI } from "../services/cartService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [location, setLocation] = useState("Select Location");
    const [error, setError] = useState(null);

    const signup = async (data) => {
        try {
            setError("");
            const res = await axiosInstance.post("/auth/signup", data);
            setUser(res.data.user);
            toast.success(res.data?.message);
            navigate("/");
        } catch (err) {
            const message = err.response?.data?.message || "Signup failed";
            err.response?.status !== 500 ? setError(message) : toast.error(message);
            if (err.response?.status !== 409) {
                console.error("Signup failed", err);
            }
        }
    };

    const login = async (data) => {
        try {
            setError("");
            const res = await axiosInstance.post("/auth/login", data);
            setUser(res.data.user);

            const { mergeCart } = useCartStore.getState();
            await mergeCart();

            navigate(res.data?.user?.role === "admin" ? "/admin" : "/");
            toast.success(res.data?.message);
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            if (err.response?.status !== 500) setError(message);
            toast.error(message);
            console.error("Login failed", err);
        }
    };

    const logout = async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            const { cart } = useCartStore.getState();
            if (cart.length > 0) {
                localStorage.setItem("guest-cart", JSON.stringify(cart));
            }
            useCartStore.setState({ cart: cart, isLoggedIn: false });

            setUser(null);
            navigate(res.data?.user?.role === "admin" ? "/login" : "/");

            toast.success(res.data?.message);
        } catch (err) {
            toast.error(err.response?.data?.message);
            console.error("Logout failed", err);
        }
    };
    const deleteAccount = async () => {
        try {
            const res = await axiosInstance.delete("/auth/delete");
            if (res.data.success) {
                useCartStore.getState().clearCart();
                localStorage.removeItem("guest-cart");
                await logout();
                setUser(null);
                toast.success(res.data?.message);
                navigate("/signup");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Delete account failed");

            console.error("Delete account failed", err);
        }
    };
    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            setUser(res.data.user);
        } catch (err) {
            if (err.response?.status === 401) {
                setUser(null);
            } else {
                console.error("Auth error:", err);
            }
            return null;
        } finally {
            setIsCheckingAuth(false);
        }
    };

    const value = { checkAuth, signup, login, logout, deleteAccount, user, setUser, isCheckingAuth, location, setLocation, setIsLocationModalOpen, isLocationModalOpen, error };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
