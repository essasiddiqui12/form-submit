const { nanoid } = require('nanoid');

// Mock database - in-memory storage (for demo purposes)
let mockDatabase = [];

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { originalUrl } = req.body;

    // Validate URL
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Check if URL already exists in mock database
    let url = mockDatabase.find(item => item.originalUrl === originalUrl);
    
    if (url) {
      return res.json({
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${process.env.VERCEL_URL || req.headers.host}/${url.shortCode}`,
        clicks: url.clicks
      });
    }

    // Generate short code
    const shortCode = nanoid(8);

    // Create new URL
    url = {
      originalUrl,
      shortCode,
      clicks: 0,
      createdAt: new Date()
    };

    // Store in mock database
    mockDatabase.push(url);

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${process.env.VERCEL_URL || req.headers.host}/${url.shortCode}`,
      clicks: url.clicks
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};