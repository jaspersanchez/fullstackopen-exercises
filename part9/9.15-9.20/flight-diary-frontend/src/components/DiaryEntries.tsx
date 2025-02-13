import Entry from "../Entry"
import { NonSensitiveDiaryEntry } from "../types"

interface DiaryEntriesProps {
  entries: NonSensitiveDiaryEntry[]
}

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
  return (
    <>
      <h2>Diary Entry</h2>
      {entries.map(entry => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  )
}

export default DiaryEntries