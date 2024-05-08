import { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

import userService from './services/users'
import blogService from './services/blogs'
import { setBlogs } from './reducers/blogReducer'
import Togglable from './components/Togglable'
import User from './components/User'
import { setUsers } from './reducers/usersReducer'
import BlogView from './components/BlogView'
import {
  Container,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material'

const App = () => {
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then((users) => {
      dispatch(setUsers(users))
    })
  }, [dispatch])

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes))),
      )
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  if (user === null) {
    return <LoginForm />
  }

  return (
    <>
      <Notification />
      {user && (
        <AppBar position="static">
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <div>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
            </div>
            <div>
              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      )}

      <Container>
        <Typography variant="h2">Blogs</Typography>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ paddingLeft: 25, fontWeight: 'bold' }}
                        >
                          Title
                        </TableCell>
                        <TableCell
                          style={{ paddingLeft: 25, fontWeight: 'bold' }}
                        >
                          Author
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {blogs.map((blog) => (
                        <Blog
                          key={blog.id}
                          blog={blog}
                          username={user.username}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
