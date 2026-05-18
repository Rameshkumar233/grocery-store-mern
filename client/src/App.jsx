import { useContext, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

import { useCartStore } from "./store/useCartStore";
import { useProductStore } from "./store/useProductStore";
import { useCategoryStore } from "./store/useCategoryStore";

import AppRouter from "./routers/AppRouter";

function App() {
    const { checkAuth, isCheckingAuth, user } = useContext(AuthContext);
    const { categories } = useCategoryStore();
    const { products } = useProductStore();
    const fetchCategories = useCategoryStore((state) => state.fetchCategories);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const fetchCart = useCartStore((state) => state.fetchCart);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user]);

    useEffect(() => {
        if (categories.length === 0) fetchCategories();
        if (products.length === 0) fetchProducts();
    }, []);

    if (isCheckingAuth) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <LoaderCircle
                    className='animate-spin text-green-500'
                    size={56}
                />
            </div>
        );
    }
    return (
        <>
            <Toaster
                position='bottom-right'
                toastOptions={{
                    style: {
                        background: "#111827",
                        color: "#fff",
                        border: "1px solid #374151",
                    },
                    success: {
                        duration: 4000,
                    },
                }}
            />
            <AppRouter />
        </>
    );
}

export default App;
