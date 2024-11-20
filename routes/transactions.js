const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    res.render('transactions/list', { transactions, totalIncome, totalExpense, balance });
});

// GET create transaction form
router.get('/new', (req, res) => {
    res.render('transactions/create');
});

// POST create a new transaction
router.post('/', async (req, res) => {
    const { type, amount, description, date } = req.body;
    await Transaction.create({ type, amount, description, date });
    res.redirect('/transactions');
});

// GET edit transaction form
router.get('/:id/edit', async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    res.render('transactions/edit', { transaction });
});

// POST update a transaction
router.post('/:id', async (req, res) => {
    const { type, amount, description, date } = req.body;
    await Transaction.findByIdAndUpdate(req.params.id, { type, amount, description, date });
    res.redirect('/transactions');
});

// POST delete a transaction
router.post('/:id/delete', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.redirect('/transactions');
});

module.exports = router;
