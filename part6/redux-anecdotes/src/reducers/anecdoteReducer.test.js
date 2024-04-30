import anecdoteReducer from './anecdoteReducer'
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
    const action = {
      type: 'anecdotes/vote',
      payload: anecdoteToVote.id,
    }
    const state = initialState
    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    expect(newState[0]).toEqual({
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    })
  })

  test('a new anecdote is created', () => {
    // Arrange
    const state = []
    deepFreeze(state)

    const action = {
      type: 'anecdotes/createAnecdote',
      payload: 'CSS is hard',
    }

    // Act
    const newState = anecdoteReducer(state, action)

    // Assert
    expect(newState.length).toEqual(1)
    expect(newState.map((anecdote) => anecdote.content)).toContainEqual(
      action.payload,
    )
  })
})
