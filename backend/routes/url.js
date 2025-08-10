const express = require('express');
const { nanoid } = require('nanoid');
const Url = require('../models/Url');

const router = express.Router();

// POST /api/shorten - Create short URL
router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate URL
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });
    
    if (url) {
      return res.json({
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${process.env.BASE_URL || 'http://localhost:5000'}/${url.shortCode}`,
        clicks: url.clicks
      });
    }

    // Generate short code
    const shortCode = nanoid(8);

    // Create new URL
    url = new Url({
      originalUrl,
      shortCode
    });

    await url.save();

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${process.env.BASE_URL || 'http://localhost:5000'}/${url.shortCode}`,
      clicks: url.clicks
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/urls - Get all URLs (for admin)
router.get('/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;