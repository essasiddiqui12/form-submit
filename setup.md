# Quick Setup Guide

## Prerequisites Installation

### 1. Install Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Verify installation: `node --version` and `npm --version`

### 2. Install MongoDB
#### Option A: Local Installation
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service

#### Option B: MongoDB Atlas (Cloud)
- Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Create a free cluster
- Get connection string

## Quick Start Commands

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Create environment file
# Copy the content below to backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:5000

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Start both servers (use 2 terminals)
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Environment Variables Template

Create `backend/.env` with these variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/url-shortener

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener

# Application Configuration
BASE_URL=http://localhost:5000
```

## Testing the Application

1. **Frontend**: Open `http://localhost:3000`
2. **Backend Health**: Open `http://localhost:5000/health`
3. **Test URL Shortening**: Enter a URL on the homepage
4. **Test Admin Panel**: Visit `http://localhost:3000/admin`

## Troubleshooting

### MongoDB Issues
```bash
# Check if MongoDB is running (Windows)
net start MongoDB

# Check if MongoDB is running (Mac/Linux)
brew services list | grep mongodb
# or
sudo systemctl status mongod
```

### Port Issues
If ports 3000 or 5000 are in use:
- Frontend: React will prompt to use a different port
- Backend: Change PORT in .env file

### Dependencies Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```