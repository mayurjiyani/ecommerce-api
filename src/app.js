const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
// Load environment variables from a .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes for the application
// Route for authentication-related requests
app.use('/api/auth', authRoutes);

// Route for patient management-related requests
app.use('/api/patients', patientRoutes);

// Route for appointment management-related requests
app.use('/api/appointments', appointmentRoutes);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
    )
    .catch((error) =>
        console.error(error.message)
    );
