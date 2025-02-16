import express, { Request, Response } from 'express';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import patientService from '../services/patientService';
import { errorMiddleware, newPatientParser } from '../utils';

const router = express.Router();

router.get('/', (_req, res: express.Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addPatient = patientService.addPatient(req.body);
    res.json(addPatient);
  }
);

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.use(errorMiddleware);

export default router;
