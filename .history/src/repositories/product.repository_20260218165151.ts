import { prisma } from "../lib/prisma";
import { ulid } from "ulid";

export const create = async (data: {
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
    },
  });
};

export const findAllProducts = async () => {
  return prisma.product.find
}

export const findAllByUserId = async (userId: string) => {
  return prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
