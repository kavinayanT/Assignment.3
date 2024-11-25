const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// In-memory storage for reminders
let reminders = []; // In-memory array to store reminders

// Routes
app.use('/', require('./routes/reminders')(reminders));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

