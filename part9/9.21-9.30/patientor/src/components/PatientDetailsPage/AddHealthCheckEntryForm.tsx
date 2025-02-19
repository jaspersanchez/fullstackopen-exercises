import {
  Box,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Button,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { Diagnosis, EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  diagnoses: Diagnosis[];
}

const isValidHealthCheckRating = (
  value: number
): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value);
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, diagnoses: Diagnosis[], theme: Theme) {
  return {
    fontWeight: diagnoses.map((val) => val.code).includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const AddHealthCheckEntryForm = ({ onSubmit, setError, diagnoses }: Props) => {
  const theme = useTheme();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

  const handleHealthCheckRatingChange = (
    event: SelectChangeEvent<HealthCheckRating>
  ) => {
    const selectedValue = Number(event.target.value);
    if (isHealthCheckRating(selectedValue)) {
      setHealthCheckRating(selectedValue);
    }
  };

  const handleDiagnosisCodes = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const addPatientEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (isValidHealthCheckRating(healthCheckRating)) {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes,
        type: 'HealthCheck',
        healthCheckRating,
      });
      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes([]);
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
        <FormControl sx={{ margin: '1em 0' }} fullWidth>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={date}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDate(event.target.value)
            }
            InputLabelProps={{ shrink: true }}
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
        <FormControl sx={{ width: '100%', margin: '1em 0' }}>
          <InputLabel id="demo-multiple-name-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-label"
            id="diagnosis"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodes}
            input={<OutlinedInput label="Diagnosis Codes" />}
            MenuProps={MenuProps}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem
                key={diagnosis.code}
                value={diagnosis.code}
                style={getStyles(diagnosis.code, diagnoses, theme)}
              >
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ margin: '1em 0' }} fullWidth variant="outlined">
          <InputLabel id="health-check-label" shrink>
            Health Check Rating
          </InputLabel>
          <Select
            labelId="health-check-label"
            value={healthCheckRating}
            onChange={handleHealthCheckRatingChange}
            label="Health Check Rating"
          >
            {Object.keys(HealthCheckRating)
              .filter((val) => !isNaN(Number(val)))
              .map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
          </Select>
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

export default AddHealthCheckEntryForm;
