import patients from '../../data/patients';
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatientEntry = (id: string, entry: EntryWithoutId): Entry => {
  const entryId = uuid();

  const newEntry = {
    id: entryId,
    ...entry,
  };

  patients[patients.findIndex((patient) => patient.id === id)].entries.push(
    newEntry
  );

  return newEntry;
};

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addPatientEntry,
};
