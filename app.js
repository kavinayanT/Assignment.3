const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactions');

dotenv.config();
const app = express();

// Database Connection
const connectDB = require('./config/database');
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/transactions', transactionRoutes);

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
