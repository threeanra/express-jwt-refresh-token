import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserRepo from "../repositories/user.repository";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";

export const register = async (data: RegisterInput) => {
  const user = await UserRepo.findUserByEmail(data.email);
  if (user) throw new Error("Account has registered");
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return UserRepo.createUser({ email: data.email, password: hashedPassword });
};

export const login = async (data: LoginInput) => {
  const user = await UserRepo.findUserByEmail(data.email);

  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error("Email atau password salah");
  }

  if (user.revokedAt) {
    await UserRepo.unrevokeUser(user.id);
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "5m" },
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );

  await UserRepo.updateRefreshToken(user.id, refreshToken);
  return { accessToken, refreshToken };
};
