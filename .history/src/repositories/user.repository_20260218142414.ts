import { PrismaClient } from "@prisma/client/extension";
import { ulid } from "ulid";

const prisma = new PrismaClient();ss

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: any) => {
  return prisma.user.create({
    data: { ...data, id: ulid() },
  });
};

export const updateRefreshToken = async (
  userId: string,
  token: string | null,
) => {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken: token },
  });
};
