import { ulid } from "ulid";
import { prisma } from "../lib/prisma";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = (data: any) => {
  return prisma.user.create({
    data: {
      ...data,
      id: ulid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const updateRefreshToken = (userId: string, token: string | null) => {
  return prisma.user.update({
    where: { id: userId },
    data: { 
      refreshToken: token,
      updatedAt: new Date()
     },
  });
};

export const findUserByRefreshToken = (token: string) => {
  return prisma.user.findFirst({ where: { refreshToken: token } });
};
