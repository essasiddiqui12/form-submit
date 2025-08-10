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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { shortCode } = req.query;
    
    // Find URL in mock database
    const url = mockDatabase.find(item => item.shortCode === shortCode);
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count
    url.clicks += 1;

    // Redirect to original URL
    res.redirect(301, url.originalUrl);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};