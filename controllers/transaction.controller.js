// controllers/transaction.controller.js
let accountBalance = 10000;
let transactions = [];

export const getBalance = (req, res) => {
  res.json({ balance: accountBalance });
};

export const sendMoney = (req, res) => {
  let { amount, to } = req.body;
  amount = Number(amount);

  if (!to || isNaN(amount) || amount <= 0 || amount > accountBalance) {
    return res.status(400).json({ message: 'Invalid amount or receiver' });
  }

  accountBalance -= amount;
  transactions.push({ type: 'Send', amount, to, time: new Date() });

  res.json({ message: `₹${amount} sent to ${to}`, balance: accountBalance });
};

export const rechargeAccount = (req, res) => {
  let { amount } = req.body;
  amount = Number(amount);

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Invalid recharge amount' });
  }

  accountBalance += amount;
  transactions.push({ type: 'Recharge', amount, time: new Date() });

  res.json({
    message: `Wallet recharged with ₹${amount}`,
    balance: accountBalance,
  });
};

export const getTransactionHistory = (req, res) => {
  res.json({ transactions });
};
