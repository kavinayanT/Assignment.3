const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Reminder', ReminderSchema);
