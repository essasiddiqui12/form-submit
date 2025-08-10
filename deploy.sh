#!/bin/bash
# 🚀 Complete GitHub Upload & Vercel Deployment Script
# Run this script to upload your project to GitHub and deploy to Vercel

echo "🚀 Starting GitHub Upload & Vercel Deployment..."
echo ""

# Step 1: Prepare Git Repository
echo "📁 Step 1: Preparing Git Repository..."
git add .
echo "   ✅ Files staged for commit"

# Commit with timestamp
commit_message="Deploy URL Shortener - $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$commit_message"
echo "   ✅ Files committed: $commit_message"

# Step 2: Create GitHub Repository & Upload
echo ""
echo "📤 Step 2: Uploading to GitHub..."
echo "   ⚠️  Please make sure you have:"
echo "      - GitHub CLI installed (gh) OR"
echo "      - Manually created a GitHub repository"
echo ""

# Option A: Using GitHub CLI (if available)
echo "🔄 Attempting to create GitHub repository..."
if command -v gh &> /dev/null; then
    echo "   GitHub CLI found! Creating repository..."
    gh repo create form-submit --public --source=. --remote=origin --push
    echo "   ✅ Repository created and pushed via GitHub CLI"
else
    echo "   ⚠️  GitHub CLI not found. Please use manual method:"
    echo ""
    echo "   Manual GitHub Setup:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Repository name: form-submit"
    echo "   3. Make it public"
    echo "   4. DO NOT initialize with README (we have files already)"
    echo "   5. Click 'Create repository'"
    echo "   6. Then run these commands:"
    echo ""
    echo "      git remote add origin https://github.com/YOUR_USERNAME/form-submit.git"
    echo "      git branch -M main"
    echo "      git push -u origin main"
    echo ""
    echo "   Press Enter when you've completed the GitHub setup..."
    read -p ""
fi

echo "   ✅ Code uploaded to GitHub!"

# Step 3: Deploy to Vercel
echo ""
echo "🌐 Step 3: Deploying to Vercel..."
echo "   ⚠️  Please make sure you have:"
echo "      - Vercel CLI installed (npm install -g vercel) OR"
echo "      - Vercel account at vercel.com"
echo ""

# Option A: Using Vercel CLI (if available)
if command -v vercel &> /dev/null; then
    echo "   Vercel CLI found! Deploying..."
    echo ""
    echo "   🔧 IMPORTANT: When prompted, set up environment variables:"
    echo "      MONGODB_URI = your MongoDB Atlas connection string"
    echo ""
    vercel --prod
    echo "   ✅ Deployed via Vercel CLI"
else
    echo "   ⚠️  Vercel CLI not found. Please use manual method:"
    echo ""
    echo "   Manual Vercel Deployment:"
    echo "   1. Go to https://vercel.com"
    echo "   2. Click 'New Project'"
    echo "   3. Import your GitHub repository: form-submit"
    echo "   4. Framework Preset: Create React App"
    echo "   5. Add Environment Variable:"
    echo "      Name: MONGODB_URI"
    echo "      Value: your MongoDB Atlas connection string"
    echo "   6. Click 'Deploy'"
    echo ""
fi

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📊 Your app will be available at:"
echo "   🌐 Vercel URL: https://form-submit-[random].vercel.app"
echo "   📱 Admin Panel: https://form-submit-[random].vercel.app/admin"
echo ""
echo "🔗 Links:"
echo "   GitHub: https://github.com/YOUR_USERNAME/form-submit"
echo "   Vercel Dashboard: https://vercel.com/dashboard"
echo ""
echo "✨ Happy URL shortening!"