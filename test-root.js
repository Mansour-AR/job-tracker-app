import express from 'express';
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Root test server working!',
    timestamp: new Date().toISOString(),
    cwd: process.cwd()
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
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, () => {
  console.log(`Root test server on port ${PORT}`);
  console.log('Current working directory:', process.cwd());
}); 