import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
  const { name, parts } = course

  const total = parts.reduce((s, p) => (s += p.exercises), 0)

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={total} />
    </div>
  )
}

export default Course
