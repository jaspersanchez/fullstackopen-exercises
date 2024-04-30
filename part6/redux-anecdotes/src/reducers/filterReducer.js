const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER': {
      return action.payload
    }
    default:
      return state
  }
}

export const filter = (value) => {
  return {
    type: 'FILTER',
    payload: value,
  }
}

export default filterReducer
