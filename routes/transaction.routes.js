// routes/transaction.routes.js
import express from 'express';
import {
  getBalance,
  sendMoney,
  rechargeAccount,
  getTransactionHistory,
} from '../controllers/transaction.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/balance', verifyToken, getBalance);
router.post('/send', verifyToken, sendMoney);
router.post('/recharge', verifyToken, rechargeAccount);
router.get('/transactions', verifyToken, getTransactionHistory);

export default router;
