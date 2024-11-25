const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/', async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });
  res.render('transactions', { transactions });
});

router.get('/add', (req, res) => res.render('addTransaction'));

router.post('/add', async (req, res) => {
  const { description, amount, type } = req.body;
  const transaction = new Transaction({ user: req.user._id, description, amount, type });
  await transaction.save();
  res.redirect('/transactions');
});

router.get('/edit/:id', async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  res.render('editTransaction', { transaction });
});

router.post('/edit/:id', async (req, res) => {
  const { description, amount, type } = req.body;
  await Transaction.findByIdAndUpdate(req.params.id, { description, amount, type });
  res.redirect('/transactions');
});

router.post('/delete/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.redirect('/transactions');
});

module.exports = router;
