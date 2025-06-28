import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in development only
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '.env') });
}

// TEMPORARY: Hardcode values to get server running (only in development)
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.AUTH0_DOMAIN) {
    process.env.AUTH0_DOMAIN = 'dev-xxxcc1cbz2oysh2g.us.auth0.com';
  }
  if (!process.env.MONGO_URI) {
    process.env.MONGO_URI = 'mongodb+srv://job-tracker-db:8hfyZe9002aexzVb@cluster0.zi1rodi.mongodb.net/job-tracker-db?retryWrites=true&w=majority&appName=Cluster0';
  }
  if (!process.env.AUTH0_CLIENT_SECRET) {
    process.env.AUTH0_CLIENT_SECRET = 'YOUR_AUTH0_CLIENT_SECRET_HERE';
  }
  if (!process.env.PORT) {
    process.env.PORT = '5000';
  }
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }
}

import app from './app.js';
import connectDB from './db/connection.js';
import config from './config/env.js';

const PORT = config.PORT;

// Start Server
const startServer = async () => {
  try {
    console.log('Starting server...');
    console.log('Environment variables:');
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- PORT:', process.env.PORT);
    console.log('- MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
    console.log('- AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN ? 'Set' : 'Not set');
    
    // Try to connect to database
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection failed:', dbError.message);
      console.log('Starting server without database connection...');
    }
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Server is ready to handle requests!');
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();