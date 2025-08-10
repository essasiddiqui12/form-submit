const { MongoClient } = require('mongodb');

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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Connect to database
    const client = await connectToDatabase();
    const db = client.db('url-shortener');
    const collection = db.collection('urls');

    // Get all URLs
    const urls = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};