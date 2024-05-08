const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const url = config.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length === 2) {
  Blog.find({}).then((result) => {
    console.log('Blog:')

    result.forEach((blog) => {
      console.log(`${blog.title.padEnd(5)} ${blog.author}`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else if (process.argv.length === 5) {
  const blog = new Blog({
    title: process.argv[2],
    author: process.argv[3],
    url: process.argv[4],
    likes: 0,
  })

  blog.save().then(() => {
    logger.info('person saved!')
    mongoose.connection.close()
    process.exit(1)
  })
}
