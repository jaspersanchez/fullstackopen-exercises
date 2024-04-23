const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')

const api = supertest(app)

describe.only('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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

    assert(keys.every((key) => key === 'id'))
  })

  describe('user signs in with valid credentials', async () => {
    const credentials = {
      username: 'root',
      password: 'password',
    }

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const user = response.body

    describe('addition of a new blog', () => {
      test('a valid blog can be added', async () => {
        const newBlog = {
          title: 'Rookie',
          author: 'Deco27',
          url: 'https://miku.com',
        }

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${user.token}`)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map((blog) => blog.title)
        assert(titles.includes(newBlog.title))
      })

      test('fails with a status code 401 if no token', async () => {
        const newBlog = {
          title: 'Rookie',
          author: 'Deco27',
          url: 'https://miku.com',
        }

        const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

        assert(response.body.error.includes('token invalid'))
      })

      test('likes must be default to 0', async () => {
        const newBlog = {
          title: 'Rookie',
          author: 'Deco27',
          url: 'https://miku.com',
        }

        const resultBlog = await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${user.token}`)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        assert.strictEqual(resultBlog.body.likes, 0)
      })

      test('blog without title and url is not added', async () => {
        const newBlog = {
          author: 'Deco27',
          likes: 100,
        }

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${user.token}`)
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      })
    })

    describe.only('deletion of a blog', () => {
      test.only('delete succeeds with status code 204 if id is valid', async () => {
        const newBlog = {
          title: 'Rookie',
          author: 'Deco27',
          url: 'https://miku.com',
        }

        const response = await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${user.token}`)
          .send(newBlog)

        const blog = response.body

        await api
          .delete(`/api/blogs/${blog.id}`)
          .set('Authorization', `Bearer ${user.token}`)
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

        const title = blogsAtEnd.map((blog) => blog.title)
        assert(!title.includes(blog.title))
      })
    })
  })

  describe('updating of a blog', () => {
    test('update succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = {
        ...blogsAtStart[0],
        likes: 23,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map((blog) => blog.likes)
      assert(likes.includes(23))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
