require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const reminderRoutes = require('./routes/reminders');
const helmet = require('helmet');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes
app.use('/reminders', reminderRoutes);

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// 404 Error Route
app.use((req, res) => {
    res.status(404).render('404');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
