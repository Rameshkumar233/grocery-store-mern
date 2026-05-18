import { Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

const AuthRoutes = () => (
    <Route element={<AuthLayout />}>
        <Route
            path='/signup'
            element={<Signup />}
        />
        <Route
            path='/login'
            element={<Login />}
        />
    </Route>
);

export default AuthRoutes;
