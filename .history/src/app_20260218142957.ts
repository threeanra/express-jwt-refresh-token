import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
// import productRoutes from './routes/product.routes';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));