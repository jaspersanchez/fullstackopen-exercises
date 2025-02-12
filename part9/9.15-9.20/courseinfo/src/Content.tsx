import Part from "./Part"

interface ContentProps {
  courses: {
    name: string,
    exerciseCount: number
  }[]
}

const Content = ({courses}: ContentProps) => {
 return <>{courses.map(course => (<Part name={course.name} exerciseCount={course.exerciseCount} />))}</>
}

export default Content