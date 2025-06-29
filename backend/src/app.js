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
    backendUrl: 'https://job-tracker-platform.onrender.com'
  });
});

// CORS configuration - temporarily allow all origins for testing
app.use(cors({
  origin: true, // Allow all origins temporarily
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept']
}));

// Additional CORS headers as backup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

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