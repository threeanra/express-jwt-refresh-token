import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as ProductService from '../services/product.service';

export const handleCreateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, price } = req.body;
    const userId = req.user!.id; 

    const product = await ProductService.createNewProduct(name, price, userId);
    
    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const handleGetAllProducts = async (res: Response) => {
  try {
    const products = await ProductService.getAllProducts()
    res.json({
      message: "success",
      result: products
    })
  } catch (error: any) {
    res.status(500).json({ message: "G"})
  }
}

export const handleGetMyProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await ProductService.getUserProducts(req.user!.id);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: "Gagal mengambil data produk" });
  }
};