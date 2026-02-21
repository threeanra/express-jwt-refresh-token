import * as ProductRepo from "../repositories/product.repository";

export const createProduct = async (data: 
) => {
  if (price < 100) throw new Error("Harga produk terlalu rendah");

  return ProductRepo.create({ name, price, userId });
};

export const getAllProducts = async () => {
  return ProductRepo.findAllProducts()
}

export const getUserProducts = async (userId: string) => {
  return ProductRepo.findAllByUserId(userId);
};