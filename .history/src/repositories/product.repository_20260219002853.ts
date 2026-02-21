import { prisma } from "../lib/prisma";
import { ulid } from "ulid";

export const createProduct = async (data: {
  name: string;
  price: number;
  userId: string;
}) => {
  return prisma.product.create({
    data: {
      id: ulid(),
      name: data.name,
      price: data.price,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const findAllProducts = async () => {
  return prisma.product.findMany({
    select: {
      name: true,
      price: true
    }
  });
};

export const findAllByUserId = async (userId: string) => {
  return prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
