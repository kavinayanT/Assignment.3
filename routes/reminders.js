const express = require('express');
const Reminder = require('../models/Reminder'); // Import the Reminder model

const router = express.Router();

// Get all reminders
router.get('/', async (req, res) => {
    try {
        const reminders = await Reminder.find(); // Fetch all reminders from the database
        res.render('reminders', { reminders }); // Render 'reminders.ejs' with the list of reminders
    } catch (err) {
        console.error(err); // Log error to console for debugging
        res.status(500).send('Error fetching reminders'); // Send 500 error if DB fetch fails
    }
});

// Form for adding new reminder
router.get('/new', (req, res) => {
    res.render('newReminder');  // Render form to add a new reminder
});

// Create new reminder
router.post('/', async (req, res) => {
    const { title, description, dueDate } = req.body;  // Extract form data
    try {
        const newReminder = new Reminder({ title, description, dueDate });  // Create a new Reminder object
        await newReminder.save();  // Save new reminder to DB
        res.redirect('/reminders');  // Redirect to the reminders list page after saving
    } catch (err) {
        console.error(err);  // Log error for debugging
        res.status(500).send('Error creating reminder');  // Send 500 error if DB save fails
    }
});

// Edit reminder (Form to edit existing reminder)
router.get('/:id/edit', async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id); // Find the reminder by ID
        if (!reminder) {
            return res.status(404).send('Reminder not found'); // If reminder not found, send 404 error
        }
        res.render('newReminder', { reminder }); // Render form with reminder data to edit
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).send('Error fetching reminder for editing');  // Send 500 error if DB fetch fails
    }
});

// Update reminder
router.post('/:id', async (req, res) => {
    const { title, description, dueDate, completed } = req.body;
    try {
        const reminder = await Reminder.findByIdAndUpdate(req.params.id, { 
            title, 
            description, 
            dueDate, 
            completed: completed === 'on' 
        }, { new: true });  // Update reminder and return the updated document
        if (!reminder) {
            return res.status(404).send('Reminder not found');  // If reminder not found, send 404 error
        }
        res.redirect('/reminders');  // Redirect to the reminders list after updating
    } catch (err) {
        console.error(err);  // Log error for debugging
        res.status(500).send('Error updating reminder');  // Send 500 error if DB update fails
    }
});

// Delete reminder
router.post('/:id/delete', async (req, res) => {
    try {
        const reminder = await Reminder.findByIdAndDelete(req.params.id); // Delete reminder by ID
        if (!reminder) {
            return res.status(404).send('Reminder not found');  // If reminder not found, send 404 error
        }
        res.redirect('/reminders');  // Redirect to the reminders list after deletion
    } catch (err) {
        console.error(err);  // Log error for debugging
        res.status(500).send('Error deleting reminder');  // Send 500 error if DB delete fails
    }
});

module.exports = router;  // Export the routes for use in app.js
