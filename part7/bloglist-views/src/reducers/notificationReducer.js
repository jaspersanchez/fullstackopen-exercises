import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      return null
    },
  },
})

export const setNotification = (obj) => {
  return (dispatch) => {
    dispatch(set(obj))
    setTimeout(() => dispatch(clear()), 3000)
  }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer
