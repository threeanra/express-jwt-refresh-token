import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import * as UserRepo from "../repositories/user.repository";
import jwt from "jsonwebtoken";

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const existing = await UserRepo.findUserByEmail(req.body.email);
    if (existing) {
      return res.status(409).json({
        message: "Account has registered",
        result: null,
      });
    }

    const user = await AuthService.register(req.body);

    return res.status(201).json({
      message: "success",
      result: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (e: any) {
    res.status(400).json({ message: "failed", result: null });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = await AuthService.login(req.body);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({
      message: "success",
      result: {
        token: accessToken,
      },
    });
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
};

export const handleRefresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const user = await UserRepo.findUserByRefreshToken(token);
  if (!user) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err: any) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" },
    );
    res.json({
      message: "success",
      result: {
        token: accessToken,
      },
    });
  });
};
