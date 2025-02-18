import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from '../../types';
import { assertNever } from '../../utils';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box>
      <Typography>Discharge:</Typography>
      <Typography style={{ paddingLeft: '0.5em' }}>
        {entry.discharge.date} ({entry.discharge.criteria})
      </Typography>
    </Box>
  );
};

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Box>
      <Typography>Employer: {entry.employerName}</Typography>
      {entry.sickLeave && (
        <Typography style={{ paddingLeft: '0.5em' }}>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </Typography>
      )}
    </Box>
  );
};

const healthColors: Record<HealthCheckRating, string> = {
  [HealthCheckRating.CriticalRisk]: '#FF0000',
  [HealthCheckRating.HighRisk]: '#FF8C00',
  [HealthCheckRating.LowRisk]: '#FFD700',
  [HealthCheckRating.Healthy]: '#00C853',
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => (
  <FavoriteIcon style={{ color: healthColors[entry.healthCheckRating] }} />
);

interface PatientEntryDetailsProps {
  entry: Entry;
}

const PatientEntryDetails = ({ entry }: PatientEntryDetailsProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default PatientEntryDetails;
