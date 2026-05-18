import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res) => {
    try {
        const userId = req.user?._id || null;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) {
            return res.json({ items: [] });
        }
        res.status(200).json(cart);
    } catch (err) {
        console.log("Failed to get cart", err.message);
        res.status(500).json({ message: "Server error: Failed to get cart" });
    }
};

export const addToCart = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product Not Found" });

        const stock = product.stock || 0;
        if (stock === 0) return res.status(400).json({ message: "Out of stock" });

        const price = Math.floor(product.price - (product.price * product.offerPercent) / 100);

        let cart = await Cart.findOne({ user: userId });
        if (!cart) cart = new Cart({ user: userId, items: [] });

        const exists = cart.items.find((item) => item.product.toString() === productId);
        if (!exists) {
            cart.items.push({ product: productId, quantity: 1, price });
        }
        await cart.save();
        await cart.populate("items.product");

        res.status(201).json(cart);
    } catch (err) {
        console.log("Failed to add to cart", err.message);
        res.status(500).json({ message: "Server error: Failed to add to cart" });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { productId, action } = req.body;

        if (!["increase", "decrease"].includes(action)) {
            return res.status(400).json({ message: "Invalid action" });
        }

        const cart = await Cart.findOne({ user: req.user?._id });
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });

        const item = cart.items.find((item) => item.product.toString() === productId);
        if (!item) return res.status(404).json({ message: "Item not in Cart" });

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        const stock = product.stock || 0;
        const price = Math.floor(product.price - (product.price * product.offerPercent) / 100);

        if (action === "increase" && item.quantity < stock) {
            item.quantity++;
        }
        if (action === "decrease") {
            item.quantity--;
        }

        cart.items = cart.items.filter((item) => item.quantity > 0);
        if (item.quantity > 0) item.price = price;

        await cart.save();
        await cart.populate("items.product");

        res.json(cart);
    } catch (err) {
        console.log("Failed to update cart", err.message);
        res.status(500).json({ message: "Server error: Failed to update cart" });
    }
};

export const mergeCart = async (req, res) => {
    try {
        const items = req.body;
        if (!Array.isArray(items)) {
            return res.status(400).json({ message: "Invalid cart data" });
        }
        const ids = items.map((i) => i.productId);

        const products = await Product.find({ _id: { $in: ids } });

        const productMap = {};
        products.forEach((p) => (productMap[p._id] = p));

        let cart = await Cart.findOne({ user: req.user?._id });
        if (!cart) cart = new Cart({ user: req.user?._id, items: [] });

        const finalItems = cart?.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.price,
        }));

        items.forEach(({ productId, quantity }) => {
            const product = productMap[productId];
            if (!product) return;

            const stock = product.stock || 0;
            if (stock === 0) return;

            const price = Math.floor(product.price - (product.price * product.offerPercent) / 100);

            const existing = finalItems.find((i) => i.product.toString() === productId);

            if (existing) {
                existing.quantity = Math.min(quantity, stock);
                existing.price = price;
            } else {
                finalItems.push({
                    product: productId,
                    quantity: Math.min(quantity, stock),
                    price,
                });
            }
        });

        cart.items = finalItems;

        await cart.save();
        await cart.populate("items.product");

        res.json(cart);
    } catch (err) {
        console.log("Failed to merge cart", err.message);
        res.status(500).json({ message: "Server error: Failed to merge cart" });
    }
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user?._id;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);

        await cart.save();
        await cart.populate("items.product");
        res.json(cart);
    } catch (err) {
        console.log("Failed to remove item cart", err.message);
        res.status(500).json({ message: "Server error: Failed to remove item cart" });
    }
};

export const clearCart = async (req, res) => {
    const userId = req.user._id;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        await cart.save();

        res.json(cart);
    } catch (err) {
        console.log("Failed to clear cart", err.message);
        res.status(500).json({ message: "Server error: Failed to clear cart" });
    }
};
