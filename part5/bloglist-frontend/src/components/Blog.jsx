import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, username, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  console.log(blog.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleAddLike = () => {
    const newObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    }

    addLike(blog.id, newObject)
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className="blogPost">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleAddLike}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {blog.user?.username && username === blog.user.username && (
          <button onClick={handleDeleteBlog}>remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
