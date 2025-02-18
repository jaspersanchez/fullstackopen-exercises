import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, EntryWithoutId, Patient } from '../../types';
import patients from '../../services/patients';
import {
  Female,
  LocalHospital,
  Male,
  MedicalServices,
  Transgender,
  Work,
} from '@mui/icons-material';
import { Alert, Box, Typography } from '@mui/material';
import PatientEntryDetails from './PatientEntryDetails';
import AddPatientEntryForm from './AddPatientEntryForm';
import patientService from '../../services/patients';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async (id: string) => {
      const patient = await patients.getPatient(id);

      setPatient(patient);
    };

    if (id) {
      fetchPatientDetails(id);
    }
  }, [id]);

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id && values) {
        const entry = await patientService.createPatientEntry(id, values);

        if (patient && entry) {
          setPatient({
            ...patient,
            entries: patient.entries.concat(entry),
          });
        }
      }
    } catch (e: unknown) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const genderIcons = {
    male: <Male />,
    female: <Female />,
    other: <Transgender />,
  };

  const entryIcons = {
    OccupationalHealthcare: <Work />,
    HealthCheck: <MedicalServices />,
    Hospital: <LocalHospital />,
  };

  if (patient) {
    return (
      <>
        <Typography variant="h4" style={{ margin: '0.5em 0' }}>
          {patient.name} {genderIcons[patient.gender]}
        </Typography>
        <Typography>ssh: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <AddPatientEntryForm onSubmit={submitNewEntry} setError={setError} />
        <Typography variant="h5" style={{ margin: '0.5em 0' }}>
          entries
        </Typography>
        {patient.entries.map((entry) => (
          <Box
            key={entry.id}
            sx={{
              border: '2px solid black',
              borderRadius: '5px',
              padding: '0.5em',
              marginBottom: '0.5em',
            }}
          >
            <Typography>
              {entry.date} {entryIcons[entry.type]}
            </Typography>
            <Typography>
              <i>{entry.description}</i>
            </Typography>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((diagnosisCode) => (
                  <li key={diagnosisCode}>
                    <Typography>
                      {diagnosisCode}{' '}
                      {
                        Object.values(diagnoses).find(
                          (diagnosis) => diagnosis.code === diagnosisCode
                        )?.name
                      }
                    </Typography>
                  </li>
                ))}
              </ul>
            )}
            <PatientEntryDetails entry={entry} />
            <Typography>diagnose by {entry.specialist}</Typography>
          </Box>
        ))}
      </>
    );
  } else {
    return <div>Wrong path</div>;
  }
};

export default PatientDetailsPage;
