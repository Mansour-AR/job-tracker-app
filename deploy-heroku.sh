#!/bin/bash

# 🚀 Heroku Deployment Script for Job Tracker API

echo "🚀 Starting Heroku deployment..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI is not installed. Please install it first:"
    echo "   npm install -g heroku"
    exit 1
fi

# Check if user is logged in to Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "❌ Not logged in to Heroku. Please login first:"
    echo "   heroku login"
    exit 1
fi

# Get app name from user
read -p "Enter your Heroku app name: " APP_NAME

# Check if app exists, if not create it
if ! heroku apps:info --app $APP_NAME &> /dev/null; then
    echo "📦 Creating new Heroku app: $APP_NAME"
    heroku create $APP_NAME
else
    echo "✅ Using existing Heroku app: $APP_NAME"
fi

# Add MongoDB addon if not already added
if ! heroku addons:info --app $APP_NAME | grep -q "mongolab"; then
    echo "🗄️ Adding MongoDB addon..."
    heroku addons:create mongolab:sandbox --app $APP_NAME
else
    echo "✅ MongoDB addon already exists"
fi

# Set environment variables
echo "🔧 Setting environment variables..."

# Get Auth0 configuration
read -p "Enter your Auth0 domain (e.g., dev-xxx.auth0.com): " AUTH0_DOMAIN
read -p "Enter your Auth0 audience (e.g., https://api.yourdomain.com): " AUTH0_AUDIENCE

# Set the environment variables
heroku config:set AUTH0_DOMAIN=$AUTH0_DOMAIN --app $APP_NAME
heroku config:set AUTH0_AUDIENCE=$AUTH0_AUDIENCE --app $APP_NAME
heroku config:set NODE_ENV=production --app $APP_NAME

echo "✅ Environment variables set successfully"

# Deploy the application
echo "🚀 Deploying to Heroku..."
git push heroku main

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your API is now live at: https://$APP_NAME.herokuapp.com"
    echo "🔍 Health check: https://$APP_NAME.herokuapp.com/health"
    
    # Open the app in browser
    heroku open --app $APP_NAME
else
    echo "❌ Deployment failed. Check the logs:"
    echo "   heroku logs --tail --app $APP_NAME"
    exit 1
fi

echo "🎉 Deployment completed successfully!" 