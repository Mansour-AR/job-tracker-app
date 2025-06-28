import express from 'express';
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Standalone server working!',
    timestamp: new Date().toISOString(),
    cwd: process.cwd()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Standalone server on port ${PORT}`);
  console.log('Current directory:', process.cwd());
}); 