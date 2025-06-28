Write-Host "🚀 Job Tracker Backend - Render Deployment Script" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Git repository not found. Please initialize git first." -ForegroundColor Red
    exit 1
}

# Check if backend directory exists
if (-not (Test-Path "backend")) {
    Write-Host "❌ Error: Backend directory not found." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Repository structure looks good!" -ForegroundColor Green

Write-Host ""
Write-Host "📋 Deployment Checklist:" -ForegroundColor Yellow
Write-Host "1. ✅ Create Render project" -ForegroundColor Green
Write-Host "2. ⏳ Set environment variables (Mongo URI, Auth0 config)" -ForegroundColor Yellow
Write-Host "3. ⏳ Test deployed API" -ForegroundColor Yellow
Write-Host ""

Write-Host "🔧 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://render.com and create a new Web Service" -ForegroundColor White
Write-Host "2. Connect your GitHub repository" -ForegroundColor White
Write-Host "3. Use these settings:" -ForegroundColor White
Write-Host "   - Build Command: cd backend && npm install" -ForegroundColor Gray
Write-Host "   - Start Command: cd backend && npm start" -ForegroundColor Gray
Write-Host "   - Environment: Node" -ForegroundColor Gray
Write-Host ""

Write-Host "🔐 Required Environment Variables:" -ForegroundColor Cyan
Write-Host "- MONGO_URI: Your MongoDB Atlas connection string" -ForegroundColor White
Write-Host "- AUTH0_DOMAIN: Your Auth0 domain" -ForegroundColor White
Write-Host "- AUTH0_CLIENT_SECRET: Your Auth0 client secret" -ForegroundColor White
Write-Host "- AUTH0_CLIENT_ID: Your Auth0 client ID" -ForegroundColor White
Write-Host "- AUTH0_AUDIENCE: Your Auth0 API audience (optional)" -ForegroundColor White
Write-Host ""

Write-Host "🧪 Test Endpoints (after deployment):" -ForegroundColor Cyan
Write-Host "- Health: GET https://your-service-name.onrender.com/health" -ForegroundColor Gray
Write-Host "- Test: GET https://your-service-name.onrender.com/test" -ForegroundColor Gray
Write-Host "- Jobs: GET https://your-service-name.onrender.com/api/jobs" -ForegroundColor Gray
Write-Host ""

Write-Host "📖 For detailed instructions, see RENDER_DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""

Write-Host "🎯 Ready to deploy! Follow the steps above." -ForegroundColor Green 