import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

const User = () => {
  const users = useSelector(({ users }) => users)
  const id = useParams().id

  const user = users.find((user) => user.id === id)

  if (!user) return

  return (
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6">Added blogs</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
