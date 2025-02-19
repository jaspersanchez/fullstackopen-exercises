import {
  Box,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Button,
  FormLabel,
  Select,
  OutlinedInput,
  SelectChangeEvent,
  MenuItem,
  TextField,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { SyntheticEvent, useState } from 'react';
import { Diagnosis, EntryWithoutId } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  diagnoses: Diagnosis[];
}

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

const AddHospitalEntryForm = ({ onSubmit, setError, diagnoses }: Props) => {
  const theme = useTheme();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

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

    if (dischargeDate && criteria) {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes,
        type: 'Hospital',
        discharge: {
          date: dischargeDate,
          criteria,
        },
      });
      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes([]);
      setDischargeDate('');
      setCriteria('');
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
        <FormLabel
          component="legend"
          sx={{ fontSize: '1.1rem', marginTop: '1em' }}
        >
          Discharge
        </FormLabel>
        <FormControl sx={{ margin: '1em 0' }} fullWidth>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={dischargeDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDischargeDate(event.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="criteria">Criteria</InputLabel>
          <Input
            id="criteria"
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
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

export default AddHospitalEntryForm;
