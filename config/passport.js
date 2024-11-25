// config/passport.js

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path according to your project structure

module.exports = function(passport) {
    // Serialize user (store the user id in session)
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user (retrieve user information from session)
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // Set up Local Strategy for authentication
    passport.use(new LocalStrategy(
        {
            usernameField: 'email', // Field to use as username (e.g., email or username)
            passwordField: 'password' // Field to use as password
        },
        (email, password, done) => {
            // Find the user by email
            User.findOne({ email: email }, (err, user) => {
                if (err) return done(err);
                if (!user) {
                    return done(null, false, { message: 'No user found with that email.' });
                }

                // Compare the provided password with the stored hashed password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) return done(err);
                    if (isMatch) {
                        return done(null, user); // Authentication successful
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            });
        }
    ));
};
