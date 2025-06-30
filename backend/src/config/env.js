import dotenv from 'dotenv';

// Load environment variables from .env file in the backend directory
dotenv.config();

// Debug: Log all environment variables
console.log('=== Environment Variables Debug ===');
console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('AUTH0') || key.includes('MONGO') || key.includes('PORT') || key.includes('NODE')));
console.log('AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Current working directory:', process.cwd());
console.log('===================================');

export default {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || null,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}; 