import express from "express";

import { protectRoute } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../../middleware/admin.middleware.js";
import { deleteUser, getUserById, getUsers, updateUserStatus } from "../../controllers/admin/adminUser.controller.js";

const router = express.Router();

router.use(protectRoute, adminOnly);

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUserStatus);
router.delete("/users/:id", deleteUser);

export default router;
