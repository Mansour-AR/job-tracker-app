#!/usr/bin/env node

/**
 * Helper script to update CORS configuration with actual Vercel domain
 * Usage: node update-cors.js <your-vercel-domain>
 * Example: node update-cors.js https://my-app.vercel.app
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appJsPath = path.join(__dirname, 'backend', 'src', 'app.js');

function updateCorsDomain(vercelDomain) {
  try {
    // Read the current app.js file
    let content = fs.readFileSync(appJsPath, 'utf8');
    
    // Remove the commented line and add the actual domain
    const newDomainLine = `  '${vercelDomain}', // Your actual Vercel domain`;
    
    // Replace the commented domain line
    content = content.replace(
      /\/\/ 'https:\/\/your-actual-app-name\.vercel\.app', \/\/ Replace with your actual Vercel domain/,
      newDomainLine
    );
    
    // Write the updated content back
    fs.writeFileSync(appJsPath, content, 'utf8');
    
    console.log('✅ CORS configuration updated successfully!');
    console.log(`✅ Added domain: ${vercelDomain}`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Commit and push your changes to GitHub');
    console.log('2. Redeploy your backend on Render');
    console.log('3. Test the sign-in functionality');
    
  } catch (error) {
    console.error('❌ Error updating CORS configuration:', error.message);
    process.exit(1);
  }
}

// Get domain from command line arguments
const vercelDomain = process.argv[2];

if (!vercelDomain) {
  console.log('❌ Please provide your Vercel domain as an argument');
  console.log('');
  console.log('Usage: node update-cors.js <your-vercel-domain>');
  console.log('Example: node update-cors.js https://my-app.vercel.app');
  console.log('');
  console.log('To find your Vercel domain:');
  console.log('1. Go to your Vercel dashboard');
  console.log('2. Click on your project');
  console.log('3. Copy the domain from the "Domains" section');
  process.exit(1);
}

// Validate domain format
if (!vercelDomain.startsWith('https://') || !vercelDomain.includes('.vercel.app')) {
  console.log('❌ Invalid Vercel domain format');
  console.log('Domain should be in format: https://your-app-name.vercel.app');
  process.exit(1);
}

updateCorsDomain(vercelDomain); 