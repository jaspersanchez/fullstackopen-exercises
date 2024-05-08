import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Typography,
  TableContainer,
  Paper,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

const Users = () => {
  const users = useSelector(({ users }) => users)

  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <TableContainer component={Paper}></TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Button
                  variant="text"
                  disableElevation
                  style={{ textTransform: 'none' }}
                  color="inherit"
                  component={Link}
                  to={`/users/${user.id}`}
                >
                  {user.name}
                </Button>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
