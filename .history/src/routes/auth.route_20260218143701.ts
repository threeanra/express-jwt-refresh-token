import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware"; 
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();
router.post("/register", validate(registerSchema), AuthController.handleRegister);
router.post("/login", validate(loginSchema), AuthController.handleLogin);
router.post("/refresh", AuthController.handleRefresh);

export default router;
