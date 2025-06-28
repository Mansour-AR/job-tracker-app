# Vercel Deployment Guide

This guide will help you deploy the frontend to Vercel.

## Prerequisites

- GitHub repository with your frontend code
- Vercel account (free tier available)
- Backend deployed on Render (or other platform)

## Step 1: Link GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing your frontend code
5. Vercel will automatically detect it's a Vite/React project

## Step 2: Configure Build Settings

Vercel should automatically detect the correct settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Step 3: Add Environment Variables

In the Vercel project settings, add the following environment variable:

### Required Environment Variable:

**Name**: `VITE_API_URL`
**Value**: Your backend URL (e.g., `https://your-backend-app.onrender.com`)

### How to add:

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Go to "Environment Variables" section
4. Add the variable:
   - Name: `VITE_API_URL`
   - Value: Your Render backend URL
   - Environment: Production (and Preview if needed)

## Step 4: Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at the provided Vercel URL

## Step 5: Test the Deployment

1. Visit your Vercel URL
2. Test the following functionality:
   - User registration
   - User login
   - Creating job applications
   - Viewing job list
   - Editing jobs
   - Deleting jobs

## Troubleshooting

### Common Issues:

1. **API Connection Errors**:
   - Verify `VITE_API_URL` is set correctly
   - Check that your backend is running and accessible
   - Ensure CORS is properly configured on your backend

2. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Verify Node.js version compatibility

3. **Environment Variables Not Working**:
   - Ensure variable names start with `VITE_`
   - Redeploy after adding environment variables

### Backend CORS Configuration

Make sure your backend (on Render) allows requests from your Vercel domain:

```javascript
// In your backend CORS configuration
app.use(
  cors({
    origin: [
      "https://your-app.vercel.app",
      "http://localhost:5173", // for local development
    ],
    credentials: true,
  })
);
```

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Environment Variables for Different Environments

You can set different environment variables for:

- **Production**: Live site
- **Preview**: Pull request deployments
- **Development**: Local development

For local development, create a `.env.local` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000
```

## Monitoring

- Check Vercel Analytics for performance metrics
- Monitor Function Logs for any runtime errors
- Set up alerts for build failures

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive configuration
- Regularly update dependencies for security patches
