import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { createOrder, getMyOrders, getOrders, getOrderById } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/my", protectRoute, getMyOrders);
router.get("/:id", protectRoute, getOrderById);
// router.get("/:id/cancel", protectRoute, cancelOrder);

// admin
router.get("/", protectRoute, adminOnly, getOrders);
// router.get("/myOrders", protectRoute, getMyOrders);

export default router;
