import { useState } from 'react'
import Button from './Button'
import Anecdote from './Anecdote'
import Header from './Header'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint32Array(anecdotes.length))

  const handleNextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVote = () => {
    const copy = new Uint32Array(votes)
    copy[selected] += 1
    setVotes(copy)
  }

  // Calculate the highest vote and its index
  const highestVoteIndex = votes.indexOf(Math.max(...votes))

  return (
    <>
      <Header title="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVote} title="vote" />
      <Button onClick={handleNextAnecdote} title="next anecdote" />
      <Header title="Anecdote with most votes" />
      <Anecdote
        anecdote={anecdotes[highestVoteIndex]}
        votes={votes[highestVoteIndex]}
      />
    </>
  )
}

export default App
