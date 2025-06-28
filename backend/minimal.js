import express from 'express';
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.json({ message: 'Minimal server working!' });
});

app.listen(PORT, () => {
  console.log(`Minimal server on port ${PORT}`);
}); 