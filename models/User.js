// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving (bcrypt)
userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) return next(err);
            this.password = hashedPassword;
            next();
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('User', userSchema);
