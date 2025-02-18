import {
  Box,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Button,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const isValidHealthCheckRating = (
  value: number
): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value);
};

const AddPatientEntryForm = ({ onSubmit, setError }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const formatDiagnosisCodes = (value: string) => {
    if (typeof value === 'string') {
      return value.split(', ').map((item) => item.trim());
    }
    return Array.isArray(value) ? value : [];
  };

  const handleHealthCheckRatingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);

    if (isValidHealthCheckRating(value)) {
      setHealthCheckRating(value);
    } else {
      setHealthCheckRating(HealthCheckRating.Healthy);
    }
  };

  const addPatientEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const formattedDiagnosisCodes = formatDiagnosisCodes(diagnosisCodes);

    if (isValidHealthCheckRating(healthCheckRating)) {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes: formattedDiagnosisCodes,
        type: 'HealthCheck',
        healthCheckRating,
      });
      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes('');
      setHealthCheckRating(HealthCheckRating.Healthy);
      setError('');
    }
  };

  return (
    <Box
      sx={{ border: '3px dotted black', padding: '0.5em', margin: '0.5em 0' }}
    >
      <Typography variant="h6" style={{ margin: '0.5em 0' }}>
        New Entry
      </Typography>
      <form onSubmit={addPatientEntry}>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="date">Date</InputLabel>
          <Input
            id="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="specialist">Specialist</InputLabel>
          <Input
            id="specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="healtcheck-rating">
            Healthcheck rating
          </InputLabel>
          <Input
            id="healthcheck-rating"
            value={healthCheckRating}
            onChange={handleHealthCheckRatingChange}
          />
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="diagnosis-codes">Diagnosis codes</InputLabel>
          <Input
            id="diagnosis-codes"
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
        </FormControl>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ padding: '0.5em' }}
        >
          <Button variant="contained" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="inherit" type="submit">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPatientEntryForm;
