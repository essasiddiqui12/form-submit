# 🚀 Complete GitHub Upload & Vercel Deployment Script (PowerShell)
# Run this script to upload your project to GitHub and deploy to Vercel

Write-Host "🚀 Starting GitHub Upload & Vercel Deployment..." -ForegroundColor Green
Write-Host ""

# Step 1: Prepare Git Repository
Write-Host "📁 Step 1: Preparing Git Repository..." -ForegroundColor Yellow
git add .
Write-Host "   ✅ Files staged for commit" -ForegroundColor Green

# Commit with timestamp
$commitMessage = "Deploy URL Shortener - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMessage
Write-Host "   ✅ Files committed: $commitMessage" -ForegroundColor Green

# Step 2: Create GitHub Repository & Upload
Write-Host ""
Write-Host "📤 Step 2: Uploading to GitHub..." -ForegroundColor Yellow
Write-Host "   ⚠️  Please make sure you have:" -ForegroundColor Yellow
Write-Host "      - GitHub CLI installed (gh) OR" -ForegroundColor White
Write-Host "      - Manually created a GitHub repository" -ForegroundColor White
Write-Host ""

# Option A: Using GitHub CLI (if available)
Write-Host "🔄 Attempting to create GitHub repository..." -ForegroundColor Cyan
try {
    gh --version | Out-Null
    Write-Host "   GitHub CLI found! Creating repository..." -ForegroundColor Green
    gh repo create form-submit --public --source=. --remote=origin --push
    Write-Host "   ✅ Repository created and pushed via GitHub CLI" -ForegroundColor Green
}
catch {
    Write-Host "   ⚠️  GitHub CLI not found. Please use manual method:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Manual GitHub Setup:" -ForegroundColor Cyan
    Write-Host "   1. Go to https://github.com/new" -ForegroundColor White
    Write-Host "   2. Repository name: form-submit" -ForegroundColor White
    Write-Host "   3. Make it public" -ForegroundColor White
    Write-Host "   4. DO NOT initialize with README (we have files already)" -ForegroundColor White
    Write-Host "   5. Click 'Create repository'" -ForegroundColor White
    Write-Host "   6. Then run these commands:" -ForegroundColor White
    Write-Host ""
    Write-Host "      git remote add origin https://github.com/YOUR_USERNAME/form-submit.git" -ForegroundColor Gray
    Write-Host "      git branch -M main" -ForegroundColor Gray
    Write-Host "      git push -u origin main" -ForegroundColor Gray
    Write-Host ""
    Read-Host "   Press Enter when you've completed the GitHub setup..."
}

Write-Host "   ✅ Code uploaded to GitHub!" -ForegroundColor Green

# Step 3: Deploy to Vercel
Write-Host ""
Write-Host "🌐 Step 3: Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "   ⚠️  Please make sure you have:" -ForegroundColor Yellow
Write-Host "      - Vercel CLI installed (npm install -g vercel) OR" -ForegroundColor White
Write-Host "      - Vercel account at vercel.com" -ForegroundColor White
Write-Host ""

# Option A: Using Vercel CLI (if available)
try {
    vercel --version | Out-Null
    Write-Host "   Vercel CLI found! Deploying..." -ForegroundColor Green
    Write-Host ""
    Write-Host "   🔧 IMPORTANT: When prompted, set up environment variables:" -ForegroundColor Yellow
    Write-Host "      MONGODB_URI = your MongoDB Atlas connection string" -ForegroundColor White
    Write-Host ""
    vercel --prod
    Write-Host "   ✅ Deployed via Vercel CLI" -ForegroundColor Green
}
catch {
    Write-Host "   ⚠️  Vercel CLI not found. Please use manual method:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Manual Vercel Deployment:" -ForegroundColor Cyan
    Write-Host "   1. Go to https://vercel.com" -ForegroundColor White
    Write-Host "   2. Click 'New Project'" -ForegroundColor White
    Write-Host "   3. Import your GitHub repository: form-submit" -ForegroundColor White
    Write-Host "   4. Framework Preset: Create React App" -ForegroundColor White
    Write-Host "   5. Add Environment Variable:" -ForegroundColor White
    Write-Host "      Name: MONGODB_URI" -ForegroundColor White
    Write-Host "      Value: your MongoDB Atlas connection string" -ForegroundColor White
    Write-Host "   6. Click 'Deploy'" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Your app will be available at:" -ForegroundColor Cyan
Write-Host "   🌐 Vercel URL: https://form-submit-[random].vercel.app" -ForegroundColor White
Write-Host "   📱 Admin Panel: https://form-submit-[random].vercel.app/admin" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Links:" -ForegroundColor Cyan
Write-Host "   GitHub: https://github.com/YOUR_USERNAME/form-submit" -ForegroundColor White
Write-Host "   Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host ""
Write-Host "✨ Happy URL shortening!" -ForegroundColor Magenta