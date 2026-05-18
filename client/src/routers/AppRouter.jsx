import { Routes } from "react-router-dom";

import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRouter = () => {
    return (
        <Routes>
            {UserRoutes()}
            {AuthRoutes()}
            {AdminRoutes()}
        </Routes>
    );
};

export default AppRouter;
