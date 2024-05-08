import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const BlogView = () => {
  const [comment, setComment] = useState('')
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

  const handleCommentClick = async (content) => {
    const response = await blogService.createComment(id, { content })
    console.log(response)

    const newBlog = { ...blog, comments: [...blog.comments, response] }

    dispatch(
      setBlogs(
        blogs.map((oldBlog) => (oldBlog.id !== blog.id ? oldBlog : newBlog)),
      ),
    )

    setComment('')
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
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <input
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={() => handleCommentClick(comment)}>add comment</button>
    </div>
  )
}

export default BlogView
