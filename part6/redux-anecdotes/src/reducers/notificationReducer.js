import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload
    },
    hideNotification(state, action) {
      state.message = null
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
