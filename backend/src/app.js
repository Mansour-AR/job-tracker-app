import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import jobsRouter from './routes/Jobs.js';
import authRouter from './routes/auth.js';

const app = express();

// Simple test route at the very beginning
app.get('/debug', (req, res) => {
  res.json({ 
    message: 'Express server is working!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    cors: 'enabled',
    origin: req.headers.origin || 'no origin'
  });
});

// CORS configuration for both development and production
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server
  'http://localhost:3000', // Alternative dev port
  'http://localhost:4173', // Vite preview server
  // Vercel domains (will be automatically allowed)
  /^https:\/\/.*\.vercel\.app$/,
  // Add your specific Vercel domain here - replace with your actual domain
    'https://job-tracker-app-ivory.vercel.app', // Your actual Vercel domain
  // Netlify domains (if you decide to use Netlify instead)
  /^https:\/\/.*\.netlify\.app$/,
  'https://your-app-name.netlify.app'  // Replace with your actual Netlify domain
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Log all origins for debugging
    console.log('Request origin:', origin);
    
    // Check if origin matches any of the allowed patterns
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return origin === allowedOrigin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      console.log('CORS: Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Root route for debugging
app.get('/', (req, res) => {
  res.json({ 
    message: 'Job Tracker Backend API is running!',
    endpoints: {
      health: '/health',
      test: '/test',
      api: '/api',
      jobs: '/jobs',
      auth: '/auth'
    },
    timestamp: new Date().toISOString()
  });
});

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Routes
app.use('/api', router);
app.use('/jobs', jobsRouter);
app.use('/auth', authRouter);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is healthy!' });
});

// Database test route
app.get('/db-test', async (req, res) => {
  try {
    const mongoose = await import('mongoose');
    const isConnected = mongoose.connection.readyState === 1;
    
    res.json({
      databaseConnected: isConnected,
      connectionState: mongoose.connection.readyState,
      databaseName: isConnected ? mongoose.connection.db.databaseName : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      databaseConnected: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default app; 