import express from "express";
import { NonSensitivePatient } from "../types";
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res: express.Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;