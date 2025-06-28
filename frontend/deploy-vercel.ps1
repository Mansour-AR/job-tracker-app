# Vercel Deployment Script for Job Tracker Frontend (PowerShell)
# This script helps prepare and deploy the frontend to Vercel

Write-Host "🚀 Starting Vercel deployment preparation..." -ForegroundColor Green

# Check if we're in the frontend directory
if (-not (Test-Path "package.json") -or -not (Test-Path "vite.config.js")) {
    Write-Host "❌ Error: Please run this script from the frontend directory" -ForegroundColor Red
    exit 1
}

# Check if Vercel CLI is installed
try {
    $null = Get-Command vercel -ErrorAction Stop
    Write-Host "✅ Vercel CLI is already installed" -ForegroundColor Green
}
catch {
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Check if .env.local exists, if not create it
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Creating .env.local file..." -ForegroundColor Yellow
    @"
# Local development environment variables
VITE_API_URL=http://localhost:5000
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "✅ Created .env.local with local development settings" -ForegroundColor Green
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the project locally to check for errors
Write-Host "🔨 Building project locally..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
}
else {
    Write-Host "❌ Build failed! Please fix the errors before deploying." -ForegroundColor Red
    exit 1
}

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green
Write-Host "Note: You'll need to set the VITE_API_URL environment variable in Vercel dashboard" -ForegroundColor Yellow
Write-Host "Set it to your Render backend URL (e.g., https://your-backend-app.onrender.com)" -ForegroundColor Yellow
Write-Host ""

vercel --prod

Write-Host ""
Write-Host "🎉 Deployment completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to your Vercel dashboard" -ForegroundColor White
Write-Host "2. Add environment variable VITE_API_URL with your backend URL" -ForegroundColor White
Write-Host "3. Test the application functionality" -ForegroundColor White
Write-Host "4. Update the backend CORS configuration with your Vercel domain if needed" -ForegroundColor White 