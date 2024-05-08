const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyList = []

    assert.strictEqual(listHelper.totalLikes(emptyList), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = listHelper.listWithOneBlog

    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = listHelper.bigBlogList

    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('most likes', () => {
  test('return most likes in a list', () => {
    const blogs = listHelper.bigBlogList

    assert.deepEqual(listHelper.favoriteBlog(blogs), {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most total blogs', () => {
  test('return the author with the most total blogs', () => {
    const blogs = listHelper.bigBlogList

    assert.deepEqual(listHelper.mostBlogs(blogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most total likes', () => {
  test('return the author with the most total likes', () => {
    const blogs = listHelper.bigBlogList

    assert.deepEqual(listHelper.mostLikes(blogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
