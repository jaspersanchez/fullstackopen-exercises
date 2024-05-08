import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification) return

  const severity = notification.type === 'error' ? 'error' : 'success'

  return <Alert severity={severity}>{notification.message}</Alert>
}

export default Notification
