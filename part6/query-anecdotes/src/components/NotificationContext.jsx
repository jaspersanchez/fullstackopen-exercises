import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
