const express = require('express');
const router = express.Router();

// View all reminders
router.get('/', (req, res) => {
  res.render('reminders', { reminders: req.reminders });
});

// Add reminder form
router.get('/add', (req, res) => {
  res.render('addReminder');
});

// Add reminder action
router.post('/add', (req, res) => {
  const { title, description, date } = req.body;
  const reminder = {
    id: req.reminders.length + 1, // Simple ID increment
    title,
    description,
    date: new Date(date),
    completed: false,
  };
  req.reminders.push(reminder); // Add to in-memory array
  res.redirect('/reminders');
});

// Mark reminder as completed
router.post('/complete/:id', (req, res) => {
  const reminder = req.reminders.find(r => r.id === parseInt(req.params.id));
  if (reminder) {
    reminder.completed = true;
  }
  res.redirect('/reminders');
});

// Edit reminder form
router.get('/edit/:id', (req, res) => {
  const reminder = req.reminders.find(r => r.id === parseInt(req.params.id));
  if (reminder) {
    res.render('editReminder', { reminder });
  } else {
    res.redirect('/reminders');
  }
});

// Update reminder
router.post('/edit/:id', (req, res) => {
  const { title, description, date } = req.body;
  const reminder = req.reminders.find(r => r.id === parseInt(req.params.id));
  if (reminder) {
    reminder.title = title;
    reminder.description = description;
    reminder.date = new Date(date);
  }
  res.redirect('/reminders');
});

// Delete reminder
router.post('/delete/:id', (req, res) => {
  req.reminders = req.reminders.filter(r => r.id !== parseInt(req.params.id));
  res.redirect('/reminders');
});

module.exports = (reminders) => {
  // Attach in-memory array to the router so routes can access it
  return router;
};

