import { PrismaClient } from "@prisma/client/extension";
import { ulid } from "ulid";

const prisma = new PrismaClient();

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

export const findAllByUserId = async (userId: string) => {
  return prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
