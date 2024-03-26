const Header = ({ course }) => {
  return <h2>{course}</h2>
}

const Total = ({ sum }) => {
  return <b>total of {sum} exercises</b>
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  )
}

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
