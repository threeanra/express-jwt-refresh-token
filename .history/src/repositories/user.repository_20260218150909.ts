import { PrismaClient } from "./path/to/generated/prisma";
import { ulid } from "ulid";

const prisma = new PrismaClient();

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const createUser = (data: any) =>
  prisma.user.create({ data: { ...data, id: ulid() } });

export const updateRefreshToken = (userId: string, token: string | null) =>
  prisma.user.update({ where: { id: userId }, data: { refreshToken: token } });

export const findUserByRefreshToken = (token: string) =>
  prisma.user.findFirst({ where: { refreshToken: token } });
