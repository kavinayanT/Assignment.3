const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['Income', 'Expense'] },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
