import { Visibility, Weather } from "./types";

interface EntryProps {
  entry: {
    id: number;
    date: string;
    visibility: Visibility;
    weather: Weather;
  }
}
const Entry = ({ entry }: EntryProps) => {
  return (
    <div key={entry.id}>
      <h2>{entry.date}</h2>
      <p>
        visibility: {entry.visibility}
        <br />
        weather: {entry.weather}
      </p>
    </div>
  )
}

export default Entry