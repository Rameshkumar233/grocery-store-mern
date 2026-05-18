import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCart, removeFromCart, addToCart, updateCart, clearCart, mergeCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/add", protectRoute, addToCart);
router.post("/update", protectRoute, updateCart);
router.post("/merge", protectRoute, mergeCart);
router.post("/remove", protectRoute, removeFromCart);
router.delete("/clear", protectRoute, clearCart);

export default router;
