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
import { Alert, Box, Button, Typography } from '@mui/material';
import PatientEntryDetails from './PatientEntryDetails';
import patientService from '../../services/patients';
import axios from 'axios';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthcareForm from './AddOccupationalHealthcareForm';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>('');
  const [activeForm, setActiveForm] = useState('');
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

  const toggleForm = (form: string) => {
    setActiveForm(activeForm === form ? '' : form);
  };

  if (patient) {
    return (
      <>
        <Typography variant="h4" style={{ margin: '0.5em 0' }}>
          {patient.name} {genderIcons[patient.gender]}
        </Typography>
        <Typography>ssh: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          my={2}
        >
          <Typography variant="h5">Add Entry Forms: </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleForm('healthCheck')}
          >
            Health Check
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => toggleForm('occupationalHealthcare')}
          >
            Occupational Healthcare
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => toggleForm('hospital')}
          >
            Hospital
          </Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        {activeForm === 'healthCheck' && (
          <AddHealthCheckEntryForm
            onSubmit={submitNewEntry}
            setError={setError}
            diagnoses={diagnoses}
          />
        )}
        {activeForm === 'occupationalHealthcare' && (
          <AddOccupationalHealthcareForm
            diagnoses={diagnoses}
            onSubmit={submitNewEntry}
            setError={setError}
          />
        )}
        {activeForm === 'hospital' && (
          <AddHospitalEntryForm
            onSubmit={submitNewEntry}
            setError={setError}
            diagnoses={diagnoses}
          />
        )}
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
