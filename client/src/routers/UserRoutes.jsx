import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Shop from "../pages/Shop";
import Deals from "../pages/Deals";
import MyOrders from "../pages/MyOrders";
import Settings from "../pages/Settings";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetails";
import OrderSuccess from "../pages/OrderSuccess";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return (
            <Navigate
                to='/login'
                replace
            />
        );
    }
    return children;
};

const UserRoutes = () => (
    <Route element={<MainLayout />}>
        <Route
            path='/'
            element={<Home />}
        />
        <Route
            path='/shop'
            element={<Shop />}
        />
        <Route
            path='/products/:id'
            element={<ProductDetails />}
        />
        <Route
            path='/deals'
            element={<Deals />}
        />
        {/* Protected */}
        <Route
            path='/cart'
            element={<Cart />}
        />
        <Route
            path='/profile'
            element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
        />
        <Route
            path='/checkout'
            element={
                <ProtectedRoute>
                    <Checkout />
                </ProtectedRoute>
            }
        />
        <Route
            path='/orders'
            element={
                <ProtectedRoute>
                    <MyOrders />
                </ProtectedRoute>
            }
        />
        <Route
            path='/order-success'
            element={
                <ProtectedRoute>
                    <OrderSuccess />
                </ProtectedRoute>
            }
        />
        <Route
            path='/settings'
            element={
                <ProtectedRoute>
                    <Settings />
                </ProtectedRoute>
            }
        />
    </Route>
);

export default UserRoutes;
