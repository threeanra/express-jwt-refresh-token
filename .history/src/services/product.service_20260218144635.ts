import * as ProductRepo from '../repositories/product.repository';

export const createNewProduct = async (name: string, price: number, userId: string) => {
  // Contoh logika bisnis: validasi tambahan atau integrasi pihak ketiga
  if (price < 100) throw new Error("Harga produk terlalu rendah");

  return ProductRepo.create({ name, price, userId });
};

export const getUserProducts = async (userId: string) => {
  return ProductRepo.findAllByUserId(userId);
};