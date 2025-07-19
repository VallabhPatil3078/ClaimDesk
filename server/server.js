require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const connectCloudinary = require('./config/cloudinary');
require('./config/passport'); // Load strategies

const app = express();

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using https
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

// Health check
app.get('/', (req, res) => res.send('API is running...'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
