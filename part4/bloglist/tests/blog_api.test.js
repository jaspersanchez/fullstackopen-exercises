const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

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

const api = supertest(app)

test('list returns correct length in JSON', async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test.only('unique identifier must be named id', async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }

  const response = await api.get('/api/blogs')

  const keys = response.body.map((blog) =>
    Object.keys(blog).find((key) => key === 'id'),
  )

  assert(keys.every((key) => key === 'key'))
})

after(async () => {
  await mongoose.connection.close()
})
