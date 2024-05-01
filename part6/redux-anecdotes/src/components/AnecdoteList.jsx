import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 10))
  }

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}
const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    [...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()),
      ),
  )

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  )
}

export default AnecdoteList
