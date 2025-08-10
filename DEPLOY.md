# Deploying URL Shortener to Vercel

This guide will help you deploy the URL Shortener application to Vercel as a full-stack app.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Setup Instructions

### 1. Prepare MongoDB Atlas

1. Create a free MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
4. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/url-shortener
   ```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
5. Click "Deploy"

#### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Add environment variable:
   ```bash
   vercel env add MONGODB_URI
   ```
   Enter your MongoDB connection string when prompted.

5. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

## Project Structure for Vercel

```
url-shortener/
├── api/                    # Serverless API functions
│   ├── shorten.js         # POST /api/shorten
│   ├── urls.js            # GET /api/urls  
│   └── [shortCode].js     # GET /:shortCode (redirects)
├── public/                # Static assets
├── src/                   # React source code
│   ├── components/        # React components
│   └── styles/           # CSS files
├── package.json          # Dependencies (includes MongoDB & nanoid)
├── vercel.json           # Vercel configuration
└── README.md
```

## Environment Variables

Set these in your Vercel dashboard or via CLI:

- `MONGODB_URI`: Your MongoDB Atlas connection string

## API Endpoints

Once deployed, your API will be available at:

- `POST /api/shorten` - Create short URLs
- `GET /api/urls` - Get all URLs (admin)
- `GET /:shortCode` - Redirect to original URL

## Features

✅ **Frontend**: React app with beautiful UI
✅ **Backend**: Serverless functions on Vercel
✅ **Database**: MongoDB Atlas (cloud)
✅ **URL Shortening**: nanoid-generated short codes
✅ **Click Tracking**: Real-time analytics
✅ **Admin Panel**: View all URLs and statistics
✅ **Responsive Design**: Works on all devices

## Testing the Deployment

1. Visit your Vercel URL
2. Test URL shortening on the homepage
3. Check the admin panel at `/admin`
4. Test short URL redirects
5. Verify click tracking works

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificates are automatically provided

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: View serverless function logs in dashboard
- **MongoDB Atlas**: Monitor database usage and performance

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Verify your connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

2. **Build Errors**
   - Check that all dependencies are in package.json
   - Verify React build completes successfully

3. **API Errors**
   - Check function logs in Vercel dashboard
   - Verify environment variables are set
   - Test API endpoints individually

## Updates and Maintenance

1. Push changes to your Git repository
2. Vercel automatically redeploys on push
3. Monitor function usage and database metrics
4. Update dependencies regularly

## Cost Considerations

- **Vercel**: Free tier includes 100GB bandwidth
- **MongoDB Atlas**: Free tier includes 512MB storage
- **Scaling**: Both services offer paid tiers for higher usage

Your URL Shortener is now live and ready to use! 🚀