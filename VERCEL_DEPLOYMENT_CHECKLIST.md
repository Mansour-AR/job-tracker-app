# Vercel Deployment Checklist

## ✅ Completed Preparations

### 1. Environment Configuration

- [x] Created `frontend/src/config/api.js` with centralized API configuration
- [x] Updated Vite config to handle environment variables
- [x] Updated all API calls to use environment variables instead of hardcoded localhost URLs
- [x] Updated backend CORS configuration to allow Vercel domains

### 2. Code Updates

- [x] Updated `SignInPage.jsx` to use API_ENDPOINTS
- [x] Updated `SignUpPage.jsx` to use API_ENDPOINTS
- [x] Updated `Dashboard.jsx` to use API_ENDPOINTS
- [x] Updated `Jobs.jsx` to use API_ENDPOINTS
- [x] Updated `JobCreate.jsx` to use API_ENDPOINTS
- [x] Verified build process works correctly

### 3. Documentation

- [x] Created `frontend/VERCEL_DEPLOYMENT.md` with detailed instructions
- [x] Created deployment scripts (`deploy-vercel.sh` and `deploy-vercel.ps1`)
- [x] Created this checklist

## 🚀 Deployment Steps

### Step 1: Link GitHub Repository

- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Select the repository containing your frontend code
- [ ] Vercel will automatically detect it's a Vite/React project

### Step 2: Configure Build Settings

- [ ] Verify Framework Preset: Vite
- [ ] Verify Build Command: `npm run build`
- [ ] Verify Output Directory: `dist`
- [ ] Verify Install Command: `npm install`

### Step 3: Add Environment Variables

- [ ] Go to your Vercel project settings
- [ ] Navigate to "Environment Variables" section
- [ ] Add environment variable:
  - **Name**: `VITE_API_URL`
  - **Value**: Your Render backend URL (e.g., `https://your-backend-app.onrender.com`)
  - **Environment**: Production (and Preview if needed)

### Step 4: Deploy

- [ ] Click "Deploy" in Vercel
- [ ] Wait for the build to complete
- [ ] Note your Vercel URL

### Step 5: Update Backend CORS (if needed)

- [ ] Go to your Render backend dashboard
- [ ] Update the CORS configuration in `backend/src/app.js` with your specific Vercel domain
- [ ] Redeploy the backend if necessary

### Step 6: Test the Deployment

- [ ] Visit your Vercel URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test creating job applications
- [ ] Test viewing job list
- [ ] Test editing jobs
- [ ] Test deleting jobs

## 🔧 Troubleshooting

### Common Issues:

1. **API Connection Errors**:

   - Verify `VITE_API_URL` is set correctly in Vercel
   - Check that your backend is running and accessible
   - Ensure CORS is properly configured on your backend

2. **Build Failures**:

   - Check that all dependencies are in `package.json`
   - Verify Node.js version compatibility

3. **Environment Variables Not Working**:
   - Ensure variable names start with `VITE_`
   - Redeploy after adding environment variables

## 📝 Notes

- The frontend is now configured to use environment variables for API URLs
- Local development will use `http://localhost:5000` by default
- Production will use the `VITE_API_URL` environment variable
- Backend CORS is configured to allow Vercel domains automatically
- All API calls have been updated to use the centralized configuration

## 🎯 Next Steps After Deployment

1. **Monitor Performance**: Use Vercel Analytics to track performance
2. **Set Up Custom Domain**: Configure a custom domain if desired
3. **Set Up Monitoring**: Configure alerts for build failures
4. **Security**: Regularly update dependencies for security patches
5. **Testing**: Set up automated testing for the deployed application
