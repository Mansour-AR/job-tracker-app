#!/bin/bash

echo "🚀 Job Tracker Backend - Render Deployment Script"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found. Please initialize git first."
    exit 1
fi

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Error: Backend directory not found."
    exit 1
fi

echo "✅ Repository structure looks good!"

echo ""
echo "📋 Deployment Checklist:"
echo "1. ✅ Create Render project"
echo "2. ⏳ Set environment variables (Mongo URI, Auth0 config)"
echo "3. ⏳ Test deployed API"
echo ""

echo "🔧 Next Steps:"
echo "1. Go to https://render.com and create a new Web Service"
echo "2. Connect your GitHub repository"
echo "3. Use these settings:"
echo "   - Build Command: cd backend && npm install"
echo "   - Start Command: cd backend && npm start"
echo "   - Environment: Node"
echo ""

echo "🔐 Required Environment Variables:"
echo "- MONGO_URI: Your MongoDB Atlas connection string"
echo "- AUTH0_DOMAIN: Your Auth0 domain"
echo "- AUTH0_CLIENT_SECRET: Your Auth0 client secret"
echo "- AUTH0_CLIENT_ID: Your Auth0 client ID"
echo "- AUTH0_AUDIENCE: Your Auth0 API audience (optional)"
echo ""

echo "🧪 Test Endpoints (after deployment):"
echo "- Health: GET https://your-service-name.onrender.com/health"
echo "- Test: GET https://your-service-name.onrender.com/test"
echo "- Jobs: GET https://your-service-name.onrender.com/api/jobs"
echo ""

echo "📖 For detailed instructions, see RENDER_DEPLOYMENT.md"
echo ""

echo "🎯 Ready to deploy! Follow the steps above." 