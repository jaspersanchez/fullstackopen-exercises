import { useEffect, useState } from "react"
import DiaryEntries from "./components/DiaryEntries"
import { createDiaryEntry, getAllEntries } from "./diaryService"
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
import AddEntryForm from "./components/AddEntryForm";
import axios from "axios";

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])
  
 const submitNewEntry = (values: NewDiaryEntry) => {
   createDiaryEntry(values).then(data => {
    setEntries(entries.concat(data))
   }).catch((e: unknown) => {
     if (axios.isAxiosError(e)) {
       if (e.response?.data && typeof e.response.data === 'string') {
        const message = e.response.data.replace('Something went wrong. ', '');
        setError(message)
       }
     }
   })  
 } 

  return (
    <div>
      <AddEntryForm  onSubmit={submitNewEntry} error={error} />
      <DiaryEntries entries={entries} />
    </div>
  )
}

export default App