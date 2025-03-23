require('dotenv').config(); // Loads .env variables
const express = require('express');
const admin = require('./config/firebase-admin');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Apply a simple rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Sample route to test Firebase Admin
app.get('/test-firebase', async (req, res, next) => {
  try {
    const snapshot = await admin.database().ref('testNode').once('value');
    res.json(snapshot.val());
  } catch (error) {
    next(error);
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
