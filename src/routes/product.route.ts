import { Router } from 'express';
import * as ProductCtrl from '../controllers/product.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { productSchema } from '../schemas/product.schema';

const router = Router();

router.use(authenticate);

router.get('/', ProductCtrl.handleGetAllProducts);
router.get('/my-product', ProductCtrl.handleGetMyProducts);
router.post('/', validate(productSchema), ProductCtrl.handleCreateProduct);

export default router;