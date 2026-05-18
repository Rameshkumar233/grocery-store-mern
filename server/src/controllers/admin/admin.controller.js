import Order from "../../models/order.model.js";
import Category from "../../models/category.model.js";
import Product from "../../models/product.model.js";
import User from "../../models/user.model.js";

export const getDashboard = async (req, res) => {
    const totalCategories = await Category.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const categories = await Category.find().select("name");

    const stats = await Promise.all(
        categories.map(async (cat) => {
            const count = await Product.countDocuments({
                category: cat._id,
                isActive: true,
            });
            return {
                name: cat.name,
                count,
            };
        }),
    );
    const lowStockProducts = await Product.find({ stock: { $lte: 10 } }).select("name stock");
    const outOfStock = await Product.countDocuments({ stock: { $eq: 0 } });
    const orders = await Order.find();
    const statusCount = {
        pending: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
    };

    orders.forEach((order) => {
        const status = order.status?.toLowerCase();
        if (statusCount[status] !== undefined) {
            statusCount[status]++;
        }
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name");

    res.json({
        stats: {
            totalCategories,
            totalProducts,
            totalUsers,
            totalOrders,
            totalRevenue,
        },
        recentOrders,
        lowStockProducts,
        outOfStock,
        categoryStats: stats,
        orderStatus: statusCount,
    });
};
