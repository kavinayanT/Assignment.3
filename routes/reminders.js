const express = require('express');
const Reminder = require('../models/Reminder');
const router = express.Router();

// View all reminders
router.get('/', async (req, res) => {
  const reminders = await Reminder.find({ user: req.user._id });
  res.render('reminders', { reminders });
});

// Add reminder form
router.get('/add', (req, res) => res.render('addReminder'));

// Add reminder action
router.post('/add', async (req, res) => {
  const { title, description, date } = req.body;
  const reminder = new Reminder({
    user: req.user._id,
    title,
    description,
    date,
    completed: false
  });
  await reminder.save();
  res.redirect('/reminders');
});

// Mark reminder as completed
router.post('/complete/:id', async (req, res) => {
  await Reminder.findByIdAndUpdate(req.params.id, { completed: true });
  res.redirect('/reminders');
});

// Edit reminder form
router.get('/edit/:id', async (req, res) => {
  const reminder = await Reminder.findById(req.params.id);
  res.render('editReminder', { reminder });
});

// Update reminder
router.post('/edit/:id', async (req, res) => {
  const { title, description, date } = req.body;
  await Reminder.findByIdAndUpdate(req.params.id, { title, description, date });
  res.redirect('/reminders');
});

// Delete reminder
router.post('/delete/:id', async (req, res) => {
  await Reminder.findByIdAndDelete(req.params.id);
  res.redirect('/reminders');
});

module.exports = router;
