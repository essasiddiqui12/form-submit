const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for testing (replace with MongoDB when available)
let urls = [];

// Routes
// POST /api/shorten - Create short URL
app.post('/api/shorten', (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate URL
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Check if URL already exists
    let url = urls.find(u => u.originalUrl === originalUrl);
    
    if (url) {
      return res.json({
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `http://localhost:5000/${url.shortCode}`,
        clicks: url.clicks
      });
    }

    // Generate short code
    const shortCode = nanoid(8);

    // Create new URL
    url = {
      _id: Date.now().toString(),
      originalUrl,
      shortCode,
      clicks: 0,
      createdAt: new Date()
    };

    urls.push(url);

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `http://localhost:5000/${url.shortCode}`,
      clicks: url.clicks
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/urls - Get all URLs (for admin)
app.get('/api/urls', (req, res) => {
  try {
    res.json(urls.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check (must be before /:shortCode route)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'URL Shortener API is running',
    urls_count: urls.length,
    timestamp: new Date().toISOString()
  });
});

// GET /:shortcode - Redirect to original URL
app.get('/:shortCode', (req, res) => {
  try {
    const { shortCode } = req.params;
    
    const url = urls.find(u => u.shortCode === shortCode);
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count
    url.clicks += 1;

    // Redirect to original URL
    res.redirect(url.originalUrl);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Frontend should connect to: http://localhost:${PORT}`);
  console.log('Using in-memory storage (no MongoDB required)');
});