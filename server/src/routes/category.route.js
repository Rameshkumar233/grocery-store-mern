import express from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { uploadCategoryImage } from "../middleware/uploadImage.js";

const router = express.Router();

// Public: Anyone can see categories
router.get("/", getCategories);

// Admin: Only admins can create or delete
router.post("/", protectRoute, adminOnly, uploadCategoryImage, createCategory);
router.patch("/:id", protectRoute, adminOnly, uploadCategoryImage, updateCategory);
router.delete("/:id", protectRoute, adminOnly, deleteCategory);

export default router;
