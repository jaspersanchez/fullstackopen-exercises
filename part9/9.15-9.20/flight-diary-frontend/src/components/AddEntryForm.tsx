import { SyntheticEvent, useState } from "react"
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface AddEntryFormProps {
  onSubmit: (values: NewDiaryEntry) => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, error }: AddEntryFormProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState('')
  
  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault()
    // const validVisibility = Object.values(Visibility).find(v => v.toString() === visibility)
    // const validWeather = Object.values(Weather).find(v => v.toString() === weather)
    
    
    // if (validVisibility && validWeather) {
      onSubmit({
        date,
        visibility, 
        weather,
        comment
      })

      setDate('')
      setVisibility(Visibility.Great)
      setWeather(Weather.Sunny)
      setComment('')
    // }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={addPatient}>
       <label>
        date
       <input type="date" value={date} onChange={ ({ target }) => setDate(target.value) } />
       </label>
       <br />
       visibility{' '}
       {
        Object.values(Visibility).map((value) => (
          <label key={value}>
            {value}{' '}
            <input 
              name="visibility"
              type="radio" 
              value={value} 
              checked={visibility === value}
              onChange={() => setVisibility(value)} 
            />
          </label>
        ))
       }
       <br />
       weather{' '}
       {
        Object.values(Weather).map((value) => (
          <label key={value}>
            {value}{' '}
            <input 
              type="radio" 
              value={value} 
              checked={weather === value}
              onChange={() => setWeather(value)} 
            />
          </label>
        ))
       }
       <br />
       <label>
        comment
        <input type="text" value={comment} onChange={ ({ target }) => setComment(target.value) }/>
       </label>
       <br />
       <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AddEntryForm