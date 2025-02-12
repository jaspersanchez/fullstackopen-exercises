interface PartProps {
  name: string,
  exerciseCount: number
}

const Part = ({ name, exerciseCount}: PartProps) => {
  return <p>{name} {exerciseCount}</p>
}

export default Part;