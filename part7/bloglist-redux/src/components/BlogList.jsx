import { useEffect, useRef } from 'react'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import blogService from '../services/blogs'

import { useSelector, useDispatch } from 'react-redux'
import { appendBlog, setBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = () => {
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

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

  const handleAddBlog = async (newObject) => {
    const blog = await blogService.create(newObject)

    dispatch(appendBlog(blog))
    dispatch(
      setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
      }),
    )
    blogFormRef.current.toggleVisibility()
  }

  const handleDeleteBlog = async (id, title) => {
    try {
      await blogService.destroy(id)

      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))

      dispatch(
        setNotification({
          message: `Blog ${title} deleted`,
          type: 'error',
        }),
      )
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: 'error',
        }),
      )
    }
  }

  const handleAddLike = async (id, newObject) => {
    try {
      const returnedBlog = await blogService.update(id, newObject)

      dispatch(
        setBlogs(
          blogs
            .map((blog) => (blog.id !== id ? blog : returnedBlog))
            .sort((a, b) => b.likes - a.likes),
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: 'error',
        }),
      )
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user && (
        <p>
          {user.name} <button onClick={handleLogout}>logout</button>
        </p>
      )}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={handleAddBlog} />
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

export default BlogList
