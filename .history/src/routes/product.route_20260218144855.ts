import { Router } from 'express';
import * as ProductCtrl from '../controllers/product.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { productSchema } from '../schemas/auth.schema';

const router = Router();

// Proteksi semua rute produk dengan JWT
router.use(authenticate);

router.get('/', ProductCtrl.handleGetMyProducts);
router.post('/', validate(productSchema), ProductCtrl.handleCreateProduct);

export default router;