const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Wonderful',
    author: 'Mark',
    url: 'https://test.com',
  },
  {
    title: 'Sober',
    author: 'Tool',
    url: 'https://tool-band.com',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

blogsInDb()

module.exports = {
  initialBlogs,
  blogsInDb,
}
