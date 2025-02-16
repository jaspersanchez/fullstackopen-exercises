import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import patients from '../../services/patients';
import { Female, Male, Transgender } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const PatientDetailsPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
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

  const genderIcons = {
    male: <Male />,
    female: <Female />,
    other: <Transgender />,
  };

  if (patient) {
    return (
      <>
        <Typography variant="h4" style={{ margin: '0.5em 0' }}>
          {patient.name} {genderIcons[patient.gender]}
        </Typography>
        <Typography>ssh: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Typography variant="h5" style={{ margin: '0.5em 0' }}>
          entries
        </Typography>
        {patient.entries.map((entry) => (
          <Box sx={{ border: '2px solid black', borderRadius: '5px' }}>
            <Typography>
              {entry.date} <i>{entry.description}</i>
            </Typography>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((diagnosisCode) => (
                  <li>
                    <Typography>{diagnosisCode}</Typography>
                  </li>
                ))}
              </ul>
            )}
          </Box>
        ))}
      </>
    );
  } else {
    return <div>Wrong path</div>;
  }
};

export default PatientDetailsPage;
