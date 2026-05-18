import { Router } from "express";
import { checkAuth, deleteAccount, login, logout, register } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete", protectRoute, deleteAccount);
router.get("/check", protectRoute, checkAuth);

export default router;
