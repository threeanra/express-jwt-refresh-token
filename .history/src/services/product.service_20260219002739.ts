import * as ProductRepo from "../repositories/product.repository";
import { ProductInput } from "../schemas/product.schema";

export const createProduct = async (data: ProductInput) => {
  if (data.price < 100) throw new Error("Harga produk terlalu rendah");

  return ProductRepo.create({ data.name, data.price, data.userId });
};

export const getAllProducts = async () => {
  return ProductRepo.findAllProducts();
};

export const getUserProducts = async (userId: string) => {
  return ProductRepo.findAllByUserId(userId);
};
