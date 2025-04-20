// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Prediction route
app.post('/predict', async (req, res) => {
  const { hours_studied, hours_slept, stress_level } = req.body;

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/predict/', {
      hours_studied,
      hours_slept,
      stress_level,
    });

    res.json(response.data); 
  } catch (error) {
    console.error('Prediction error:', error.message);
    res.status(500).json({ error: 'Prediction failed. Try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});
