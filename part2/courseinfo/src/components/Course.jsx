import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
  const { name, parts } = course
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total
        sum={
          parts[0].exercises +
          parts[1].exercises +
          parts[2].exercises +
          parts[3].exercises
        }
      />
    </div>
  )
}

export default Course
