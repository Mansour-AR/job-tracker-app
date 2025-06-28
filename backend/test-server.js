import express from 'express';

const app = express();
const PORT = process.env.PORT || 10000;

// Simple test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Test server is working!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});

export default app; 