import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware"; 
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
router.post("/register", validate(registerSchema), AuthController.handleRegister);
router.post("/login", validate(loginSchema), AuthController.handleLogin);
router.post("/refresh", AuthController.handleRefresh);
router.post("/logout", authenticate, AuthController.handleLogout);

export default router;
