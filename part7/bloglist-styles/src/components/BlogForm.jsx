import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { appendBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Typography, Button, TextField, Box } from '@mui/material'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleAddBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })

      dispatch(appendBlog(blog))
      dispatch(
        setNotification({
          message: `a new blog ${blog.title} by ${blog.author} added`,
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

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
      <Typography variant="h4">create new</Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleAddBlog}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <div style={{ paddingLeft: 10 }}>
          <Button variant="contained" type="submit">
            create
          </Button>
        </div>
      </Box>
    </>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
}

export default BlogForm
