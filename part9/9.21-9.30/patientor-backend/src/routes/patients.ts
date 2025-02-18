import express, { Request, Response } from 'express';
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import patientService from '../services/patientService';
import { errorMiddleware, newEntryParser, newPatientParser } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
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

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient>) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Entry>
  ) => {
    const addEntry = patientService.addPatientEntry(req.params.id, req.body);
    res.json(addEntry);
  }
);

router.use(errorMiddleware);

export default router;
