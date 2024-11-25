const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectDB = async () => {
    try {
        // Debugging: Print the URI (optional for troubleshooting)
        console.log('MONGO_URI:', process.env.MONGO_URI);

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Optional for older versions of Mongoose
            useUnifiedTopology: true, // Optional for older versions of Mongoose
        });

        console.log('Connected to MongoDB'); // Connection successful
    } catch (err) {
        console.error('MongoDB connection error:', err); // Log connection error
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // Export the connectDB function
