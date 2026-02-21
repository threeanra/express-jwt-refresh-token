import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  AuthController.handleRegister,
);

// Login: Validasi input -> Jalankan Logic Login (Set Cookie & Token)
router.post("/login", validate(loginSchema), AuthController.handleLogin);

// Refresh Token: Untuk Auto-login (Membaca HttpOnly Cookie)
router.post("/refresh", AuthController.handleRefresh);

// Logout: Menghapus token di DB dan Cookie
router.post("/logout", AuthController.handleLogout);

export default router;
