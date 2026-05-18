import express from "express";

import { protectRoute } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../../middleware/admin.middleware.js";
import { getDashboard } from "../../controllers/admin/admin.controller.js";

const router = express.Router();

router.use(protectRoute, adminOnly);

router.get("/dashboard", getDashboard);

export default router;
