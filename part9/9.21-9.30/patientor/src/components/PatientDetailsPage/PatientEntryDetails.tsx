import { Entry } from '../../types';

const HospitalEntry = () => {
  return <div>Hospital Entry</div>;
};

const PatientEntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry />;
  }
};

export default PatientEntryDetails;
