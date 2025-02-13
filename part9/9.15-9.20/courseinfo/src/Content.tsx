import Part from "./Part"
import { CoursePart } from "./types"

interface ContentProps {
  courses: CoursePart[]
}

const Content = ({courses}: ContentProps) => {
 return <>{courses.map(course => (<Part key={course.name} part={course} />))}</>
}

export default Content