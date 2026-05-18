import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteAddress, saveAddress, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/profile", protectRoute, updateProfile);
router.patch("/address/save", protectRoute, saveAddress);
router.delete("/address/:id", protectRoute, deleteAddress);

export default router;
