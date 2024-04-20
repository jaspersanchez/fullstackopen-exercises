const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('list returns correct length in JSON', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier must be named id', async () => {
  const response = await api.get('/api/blogs')

  const keys = response.body.map((blog) =>
    Object.keys(blog).find((key) => key === 'id'),
  )
  console.log(keys)

  assert(keys.every((key) => key === 'id'))
})

test.only('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Rookie',
    author: 'Deco27',
    url: 'https://miku.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  assert(titles.includes(newBlog.title))
})

after(async () => {
  await mongoose.connection.close()
})
