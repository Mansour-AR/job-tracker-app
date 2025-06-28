import express from 'express';

const app = express();
const PORT = process.env.PORT || 10000;

// Basic middleware
app.use(express.json());

// Test routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Job Tracker API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/debug', (req, res) => {
  res.json({ 
    message: 'Debug endpoint working!',
    env: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Server is ready!');
});

export default app; 