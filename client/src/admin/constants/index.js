import { LayoutDashboard, Package, ShoppingBag, UserCog, Users } from "lucide-react";

export const navigation = [
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        path: "/admin/customers",
        name: "Customers",
        icon: Users,
    },
    {
        path: "/admin/staff",
        name: "Staff",
        icon: UserCog,
    },
    {
        name: "Catalog",
        icon: Package,
        children: [
            { name: "Categories", path: "/admin/categories" },
            { name: "Products", path: "/admin/products" },
        ],
    },
    {
        name: "Orders",
        icon: ShoppingBag,
        path: "/admin/orders",
    },
];
