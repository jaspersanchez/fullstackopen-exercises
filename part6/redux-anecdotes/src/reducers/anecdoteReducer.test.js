import anecdoteReducer, { vote } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'
import { initialState } from './anecdoteReducer'

describe('anecdote reducer', () => {
  test('return initial state with undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    }

    const newState = anecdoteReducer(undefined, action)

    expect(newState).toEqual(initialState)
  })

  test('an anecdote votes is incremented', () => {
    const anecdoteToVote = initialState[0]
    const action = vote(anecdoteToVote.id)
    const state = initialState
    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    expect(newState[0]).toEqual({
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    })
  })
})
