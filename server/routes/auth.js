const express = require('express');
const router = express.Router();
const { signup, login, resetPassword } = require('../controllers/authController');

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Reset Password
router.post('/reset-password', resetPassword);

module.exports = router;
