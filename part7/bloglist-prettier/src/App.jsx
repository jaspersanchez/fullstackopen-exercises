import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null })

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const blogFormRef = useRef()

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message,
      type,
    })

    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username,
      password,
    }

    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddBlog = async (newObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(newObject)

      setBlogs(blogs.concat(blog))
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
    }
  }

  const handleAddLike = async (id, newObject) => {
    try {
      const returnedBlog = await blogService.update(id, newObject)

      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : returnedBlog))
          .sort((a, b) => b.likes - a.likes),
      )
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
    }
  }

  const handleDeleteBlog = async (id, title) => {
    try {
      await blogService.destroy(id)

      setBlogs(blogs.filter((blog) => blog.id !== id))
      notifyWith(`Blog ${title} deleted`, 'error')
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <form onSubmit={handleLogin} method="post">
          <div>
            username
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />
      {user && (
        <p>
          {user.name} <button onClick={handleLogout}>logout</button>
        </p>
      )}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={handleAddBlog} notifyWith={notifyWith} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          username={user.username}
          addLike={handleAddLike}
          deleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  )
}

export default App
