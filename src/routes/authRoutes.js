// Import necessary modules and functions
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Define route for user registration
// This route is used to create a new user (patient, doctor, or admin)
router.post('/register', register);

// Define route for user login
// This route allows users to authenticate and receive a JWT token
router.post('/login', login);

module.exports = router;
