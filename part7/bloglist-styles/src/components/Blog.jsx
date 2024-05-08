import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { TableRow, TableCell, Button } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <TableRow data-testid="blog-post">
      <TableCell>
        <Button
          variant="text"
          disableElevation
          style={{ textTransform: 'none' }}
          color="inherit"
          component={Link}
          to={`/blogs/${blog.id}`}
        >
          {blog.title}
        </Button>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
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
}

export default Blog
