// Import dependencies
const express = require('express');
const mongoose = require('./config/db'); // Import DB connection
const reminderRoutes = require('./routes/reminders');
const helmet = require('helmet'); // Import Helmet for security

const app = express();

// Set view engine and middleware
app.set('view engine', 'ejs');  // Set EJS as the templating engine
app.use(express.static('public')); // Serve static files from 'public' folder (like CSS, JS)
app.use(express.urlencoded({ extended: true })); // Built-in middleware for parsing URL-encoded data
app.use(helmet()); // Use Helmet to secure HTTP headers

// Routes
app.use('/reminders', reminderRoutes); // Routes for reminders handled by reminderRoutes

// Home Route
app.get('/', (req, res) => {
    res.render('index');  // Render the 'index.ejs' page when visiting the home page
});

// Error handling for unmatched routes
app.use((req, res, next) => {
    res.status(404).render('404');  // Render a custom 404 page
});

// Start server
const PORT = process.env.PORT || 3000;  // Port from environment variables or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Start the server and log success message
