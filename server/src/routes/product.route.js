import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { uploadProductImage } from "../middleware/uploadImage.js";

const router = express.Router();
// Public Access
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin Access (Protected)
router.post("/", protectRoute, adminOnly, uploadProductImage, createProduct);
router.patch("/:id", protectRoute, adminOnly, uploadProductImage, updateProduct);
router.delete("/:id", protectRoute, adminOnly, deleteProduct);

export default router;
