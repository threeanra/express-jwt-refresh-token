import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export const updateRefreshToken = async (userId: string, token: string | null) => {
  return prisma.user.update({
    where: { id: userId },
    data: { 
      // Kita tetap pakai camelCase sesuai definisi model di Prisma
      refreshToken: token 
    }
  });
};

export const findProductWithUser = async (productId: string) => {
  return prisma.product.findUnique({
    where: { id: productId },
    include: { user: true } // Relasi tetap terbaca dengan mudah
  });
};