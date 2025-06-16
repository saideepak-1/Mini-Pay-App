import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/account', transactionRoutes);

app.listen(5000, () => {
  console.log("MiniPay backend running on port 5000");
});