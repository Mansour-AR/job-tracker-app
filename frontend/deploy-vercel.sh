#!/bin/bash

# Vercel Deployment Script for Job Tracker Frontend
# This script helps prepare and deploy the frontend to Vercel

echo "🚀 Starting Vercel deployment preparation..."

# Check if we're in the frontend directory
if [ ! -f "package.json" ] || [ ! -f "vite.config.js" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if .env.local exists, if not create it
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Local development environment variables
VITE_API_URL=http://localhost:5000
EOF
    echo "✅ Created .env.local with local development settings"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project locally to check for errors
echo "🔨 Building project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo "Note: You'll need to set the VITE_API_URL environment variable in Vercel dashboard"
echo "Set it to your Render backend URL (e.g., https://your-backend-app.onrender.com)"
echo ""

vercel --prod

echo ""
echo "🎉 Deployment completed!"
echo ""
echo "Next steps:"
echo "1. Go to your Vercel dashboard"
echo "2. Add environment variable VITE_API_URL with your backend URL"
echo "3. Test the application functionality"
echo "4. Update the backend CORS configuration with your Vercel domain if needed" 