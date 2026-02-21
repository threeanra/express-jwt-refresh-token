import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserRepo from "../repositories/user.repository";

export const register = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return UserRepo.createUser({ email: data.email, password: hashedPassword });
};

export const login = async (data: any) => {
  const user = await UserRepo.findUserByEmail(data.email);
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error("Kredensial salah");
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );

  await UserRepo.updateRefreshToken(user.id, refreshToken);
  return { accessToken, refreshToken };
};
