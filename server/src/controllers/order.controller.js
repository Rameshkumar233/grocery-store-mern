import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

const SHIPPING_CHARGE = 20;
const FREE_SHIPPING_MIN = 199;

const calcPrices = (items) => {
    const itemsPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shippingPrice = itemsPrice > FREE_SHIPPING_MIN ? 0 : SHIPPING_CHARGE;
    const totalPrice = itemsPrice + shippingPrice;
    return { itemsPrice, shippingPrice, totalPrice };
};

export const createOrder = async (req, res) => {
    const { orderData } = req.body;
    const { shippingAddress, paymentMethod } = orderData;
    try {
        const orderId = `ORD - ${Date.now()}`;
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({ message: "Product is out of Stock" });
            }
        }

        const orderItems = cart.items.map((i) => ({
            productId: i.product._id,
            name: i.product.name,
            image: i.product.image,
            price: i.price,
            quantity: i.quantity,
        }));
        const prices = calcPrices(orderItems);

        const order = await Order.create({
            user: req.user._id,
            orderId,
            orderItems,
            shippingAddress,
            paymentMethod,
            ...prices,
        });

        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity },
            });
        }

        cart.items = [];

        await cart.save();

        res.status(201).json({
            order,
            success: true,
            message: "Order placed sucessfully",
        });
    } catch (err) {
        console.log("Failed to create order", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
        console.log("Failed to get all orders", err.message);
    }
};

// Admin
export const getOrders = async (req, res) => {
    try {
        const { status, sort } = req.query;

        const query = {};

        if (status && status !== "all") {
            query.status = status;
        }
        const sortMap = {
            latest: { createdAt: -1 },
            oldest: { createdAt: 1 },
        };
        const sortOption = sortMap[sort] || { createdAt: -1 };

        const orders = await Order.find(query).sort(sortOption).populate("user", "name email");

        const total = await Order.countDocuments(query);
        res.status(200).json({ orders, total });
    } catch (error) {
        console.log("Error in get order", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email").populate("items.product", "name price images");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatus = ["Pending", "Shipped", "Delivered", "Cancelled"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // 🔒 Prevent invalid transitions (important)
        if (order.status === "Delivered") {
            return res.status(400).json({
                message: "Delivered order cannot be changed",
            });
        }

        if (order.status === "Cancelled") {
            return res.status(400).json({
                message: "Cancelled order cannot be changed",
            });
        }

        order.status = status;

        // ✅ Auto mark paid if delivered (optional)
        if (status === "Delivered") {
            order.isPaid = true;
        }

        await order.save();

        res.json({ message: "Order updated", order });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
