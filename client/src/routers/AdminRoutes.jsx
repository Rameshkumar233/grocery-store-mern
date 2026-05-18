import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import AdminLayout from "../admin/layout/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import Customers from "../admin/pages/Customers";
import Staff from "../admin/pages/Staff";
import UserDetails from "../admin/pages/UserDetails";
import Categories from "../admin/pages/Categories";
import CategoryForm from "../admin/pages/CategoryForm";
import Products from "../admin/pages/Products";
import ProductForm from "../admin/pages/ProductForm";
import Orders from "../admin/pages/Orders";
import LoadingSpinner from "../shared/states/LoadingSpinner";

const ProtectedAdminRoute = ({ children }) => {
    const { user, isCheckingAuth } = useContext(AuthContext);
    if (isCheckingAuth) {
        return <LoadingSpinner fullscreen />;
    }
    if (!user || user.role !== "admin") {
        return (
            <Navigate
                to='/login'
                replace
            />
        );
    }
    return children;
};

const AdminRoutes = () => (
    <Route
        path='/admin'
        element={
            <ProtectedAdminRoute>
                <AdminLayout />
            </ProtectedAdminRoute>
        }>
        <Route
            index
            element={
                <Navigate
                    to='dashboard'
                    replace
                />
            }
        />
        <Route
            path='dashboard'
            element={<Dashboard />}
        />
        <Route
            path='customers'
            element={<Customers />}
        />
        <Route
            path='staff'
            element={<Staff />}
        />
        <Route
            path=':type/:id'
            element={<UserDetails />}
        />
        <Route
            path='categories'
            element={<Categories />}
        />
        <Route
            path='categories/add'
            element={<CategoryForm />}
        />
        <Route
            path='categories/edit/:id'
            element={<CategoryForm />}
        />
        <Route
            path='products'
            element={<Products />}
        />
        <Route
            path='products/add'
            element={<ProductForm />}
        />
        <Route
            path='products/edit/:id'
            element={<ProductForm />}
        />
        <Route
            path='orders'
            element={<Orders />}
        />
    </Route>
);

export default AdminRoutes;
