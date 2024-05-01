import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './components/NotificationContext'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: `anecdote ${anecdote.content} voted`,
    })
    setTimeout(
      () =>
        dispatch({
          type: 'HIDE_NOTIFICATION',
        }),
      5000,
    )
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>loading data...</div>

  if (result.isError)
    return <div>anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
