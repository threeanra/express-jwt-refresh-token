import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as ProductService from '../services/product.service';

export const handleCreateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, price } = req.body;
    const userId = req.user.id; // Diambil dari token JWT via middleware

    const product = await ProductService.createProduct(name, price, userId);
    
    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const handleGetMyProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await ProductService.getUserProducts(req.user.id);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: "Gagal mengambil data produk" });
  }
};