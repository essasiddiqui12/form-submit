const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Url = require('./models/Url');
const urlRoutes = require('./routes/url');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with fallback values
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/url-shortener';
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

console.log('Connecting to MongoDB:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  console.log('Please ensure MongoDB is running on your system');
});

// Routes
app.use('/api', urlRoutes);

// GET /:shortcode - Redirect to original URL
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count
    url.clicks += 1;
    await url.save();

    // Redirect to original URL
    res.redirect(url.originalUrl);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'URL Shortener API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`BASE_URL: ${BASE_URL}`);
});