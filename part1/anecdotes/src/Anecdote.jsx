import Button from './Button'

const Anecdote = ({ anecdote, votes, onClick }) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
      <Button onClick={onClick} title="vote" />
    </>
  )
}

export default Anecdote
