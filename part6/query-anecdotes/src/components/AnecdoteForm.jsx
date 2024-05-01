import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `anecdote ${newAnecdote.content} created`,
      })
      setTimeout(
        () =>
          dispatch({
            type: 'HIDE_NOTIFICATION',
          }),
        5000,
      )
    },
    onError: (exception) => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: exception.response.data.error,
      })
      setTimeout(
        () =>
          dispatch({
            type: 'HIDE_NOTIFICATION',
          }),
        5000,
      )
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
