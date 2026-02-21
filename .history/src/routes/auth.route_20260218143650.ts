import { Router } from "express";
import * as AuthCtrl from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware"; 
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();
router.post("/register", validate(registerSchema), AuthCtrl.handleRegister);
router.post("/login", validate(loginSchema), AuthCtrl.handleLogin);
router.post("/refresh", AuthCtrl.handleRefresh);

export default router;
