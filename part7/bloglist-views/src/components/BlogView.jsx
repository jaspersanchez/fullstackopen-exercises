import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogView = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()

  const handleAddLike = async (id) => {
    const newObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    }

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

  if (!blog) return

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => handleAddLike(blog.id)}>like</button>
      </div>
      <div>Added by {blog.user.name}</div>
    </div>
  )
}

export default BlogView
