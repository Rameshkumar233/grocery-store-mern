import Cart from "../../models/cart.model.js";
import Order from "../../models/order.model.js";
import User from "../../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const { search, sort, status } = req.query;

        const query = {};
        if (search) {
            query.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
        }
        if (status && status !== "all") query.status = status;
        const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };
        const total = await User.countDocuments(query);

        const users = await User.find(query).select("-password").sort(sortOption);

        res.status(200).json({ users, count: total });
    } catch (err) {
        console.log("Failed to fetch users", err.message);
        res.status(500).json({ message: "Server error: Failed to fetch users" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cart = await Cart.findOne({
            user: id,
        }).populate({
            path: "items.product",
            select: "name images price offerPercent stock",
        });

        const orders = await Order.find({
            user: id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            user: {
                ...user.toObject(),
                cart,
                orders,
            },
        });
    } catch (err) {
        console.log("Server error:", err.message);
        res.status(500).json({ message: "Error fetching user" });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, status } = req.body;

        const user = await User.findByIdAndUpdate(id, { role, status }, { returnDocument: "after" });

        return res.json(user);
    } catch (err) {
        return res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};
