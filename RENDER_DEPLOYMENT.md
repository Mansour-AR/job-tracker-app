# Render Deployment Guide

## Prerequisites

- Render account (free tier available)
- MongoDB Atlas database
- Auth0 application configured

## Step 1: Create Render Project

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `job-tracker-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

## Step 2: Set Environment Variables

In your Render dashboard, go to your service and add these environment variables:

### Required Variables:

- `MONGO_URI`: Your MongoDB Atlas connection string
- `AUTH0_DOMAIN`: Your Auth0 domain (e.g., `dev-xxxcc1cbz2oysh2g.us.auth0.com`)
- `AUTH0_CLIENT_SECRET`: Your Auth0 client secret
- `AUTH0_CLIENT_ID`: Your Auth0 client ID
- `AUTH0_AUDIENCE`: Your Auth0 API audience (optional)

### Optional Variables:

- `NODE_ENV`: `production`
- `PORT`: `10000` (Render will set this automatically)

## Step 3: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for the build to complete (usually 2-5 minutes)

## Step 4: Test Your Deployed API

Once deployed, your API will be available at:
`https://your-service-name.onrender.com`

### Test Endpoints:

- Health check: `GET /api/health`
- Jobs: `GET /api/jobs`
- Create job: `POST /api/jobs`

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in `package.json`
2. **Environment variables not set**: Ensure all required variables are configured in Render
3. **Database connection fails**: Verify your MongoDB URI is correct and accessible
4. **Port issues**: Render automatically sets the PORT environment variable

### Logs:

- Check the "Logs" tab in your Render dashboard for detailed error messages
- Use `console.log()` statements in your code for debugging

## Security Notes

- Never commit `.env` files to your repository
- Use Render's environment variable system for sensitive data
- Ensure your MongoDB Atlas cluster has proper network access rules
- Configure Auth0 application settings for your production domain
