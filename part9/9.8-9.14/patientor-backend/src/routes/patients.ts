import express from "express";
import { NonSensitivePatient } from "../types";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res: express.Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newEntry = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newEntry);
    
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage); 
  }
  });

export default router;