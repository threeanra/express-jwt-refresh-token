import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserRepo from "../repositories/user.repository";

export const registerUser = async (payload: any) => {
  const existing = await UserRepo.findUserByEmail(payload.email);
  if (existing) throw new Error("Email sudah terdaftar");

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  return UserRepo.createUser({
    email: payload.email,
    password: hashedPassword,
  });
};

export const generateTokens = (user: { id: string; email: string }) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
