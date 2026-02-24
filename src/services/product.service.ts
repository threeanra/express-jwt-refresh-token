import * as ProductRepo from "../repositories/product.repository";
import { ProductInput } from "../schemas/product.schema";

export const createProduct = async (data: ProductInput, userId: string) => {
  if (data.price < 100) throw new Error("Harga produk terlalu rendah");

  return ProductRepo.createProduct({
    name: data.name,
    price: data.price,
    userId,
  });
};

export const getAllProducts = async () => {
  return ProductRepo.findAllProducts();
};

export const getUserProducts = async (userId: string) => {
  return ProductRepo.findAllByUserId(userId);
};
