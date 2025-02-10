import { Gender, NewPatient } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data.');
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object 
    && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };
    
   return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (str: string): str is Gender => {
  return Object.values(Gender).map(key => key.toString()).includes(str);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('Name is incorrect.');

  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) throw new Error('Date is incorrect.');
  
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error('SSN is incorrect.');
  
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) throw new Error('Gender is incorrect.');
  
  return gender;
};
  
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('Occupation is incorrect.');
  
  return occupation;
};

export default toNewPatient;