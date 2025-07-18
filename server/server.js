require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const connectCloudinary = require('./config/cloudinary');

const app = express();

// Connect to DB
connectDB();

// Cloud Storage
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
