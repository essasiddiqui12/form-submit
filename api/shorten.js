const { MongoClient } = require('mongodb');
const { nanoid } = require('nanoid');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/url-shortener');
  await client.connect();
  cachedClient = client;
  return client;
}

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

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db('url-shortener');
    const collection = db.collection('urls');

    // Check if URL already exists
    let url = await collection.findOne({ originalUrl });
    
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

    await collection.insertOne(url);

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