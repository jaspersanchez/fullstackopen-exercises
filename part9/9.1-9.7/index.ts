import express = require('express');
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
if (!('height' in req.query) || !('weight' in req.query)) {
  res.status(400).json({error: 'malformatted parameters'})
}

const {height, weight} = req.query

if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
  res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight))
  })
} else {
  res.status(400).json({error: 'malformatted parameters'})
}
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});