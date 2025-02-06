import express from "express";
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
if (!('height' in req.query) || !('weight' in req.query)) {
  res.status(400).json({error: 'malformatted parameters'});
}

const {height, weight} = req.query;

if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
  res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight))
  });
} else {
  res.status(400).json({error: 'malformatted parameters'});
}
});

app.post('/exercises', (req, res) => {
  if (!('daily_exercises' in req.body) || !('target' in req.body)) {
    console.log('error');
    res.status(400).json({error: 'missing parameters'});
  }

 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
 const {daily_exercises, target} = req.body; 
 
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 if ((!(Array.isArray(daily_exercises)) || daily_exercises.some((item: any) => isNaN(Number(item)))) || isNaN(Number(target))) {
  res.status(400).json({error: 'malformatted parameters'});
 } else {
 // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
 res.json(calculateExercise(target, daily_exercises));
 }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});