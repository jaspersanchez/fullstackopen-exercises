const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, assertNotif } = require('./helper')
const { resolve } = require('path')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Jasper Sanchez',
        username: 'djasper',
        password: 'test123',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'djasper', 'test123')
      await expect(page.getByText('Jasper Sanchez')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'djasper', 'wrong')
      await assertNotif(
        page,
        expect,
        'invalid username or password',
        'rgb(255, 0, 0)',
      )
      await expect(page.getByText('Jasper Sanchez')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'djasper', 'test123')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'CSS is hard',
        'Mark Mijares',
        'https://digital-marks.com',
      )

      await assertNotif(
        page,
        expect,
        'a new blog CSS is hard by Mark Mijares added',
        'rgb(0, 128, 0)',
      )
      await expect(page.getByText('CSS is hard Mark Mijares')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('https://digital-marks.com')).toBeVisible()
      await expect(page.getByText('likes 0')).toBeVisible()
      await expect(
        page.getByText('Jasper Sanchez', { exact: true }),
      ).toBeVisible()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    })

    describe('a new blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'CSS is hard',
          'Mark Mijares',
          'https://digital-marks.com',
        )
      })

      test('a blog can be edited', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a user added the blog can delete it', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(
          page.getByText('CSS is hard Mark Mijares'),
        ).not.toBeVisible()
        await assertNotif(
          page,
          expect,
          'Blog CSS is hard deleted',
          'rgb(255, 0, 0)',
        )
      })

      test('the user added the blog see remove btn', async ({ page }) => {
        await expect(page.getByText('Jasper Sanchez')).toBeVisible()

        await page.getByRole('button', { name: 'view' }).click()
        await expect(
          page.getByText('Jasper Sanchez', { exact: true }),
        ).toBeVisible()
      })
    })

    describe('a few blogs exists', () => {
      beforeEach(async ({ page }) => {
        const blogs = [
          {
            title: 'CSS is hard',
            author: 'Mark Mijares',
            url: 'https://digital-marks.com',
          },
          {
            title: 'HTML is easy',
            author: 'Jimmy Mangente',
            url: 'https://kalbong-kwa.com',
          },
          {
            title: 'Rust is Chad',
            author: 'Jasper Sanchez',
            url: 'https://tokyo-osaka.com',
          },
        ]

        for (const blog of blogs) {
          await createBlog(page, blog.title, blog.author, blog.url)
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      })

      test('blogs are arranged in order', async ({ page }) => {
        const elements = await page.getByRole('button', { name: 'view' }).all()
        await elements[1].click()
        await page.getByRole('button', { name: 'like' }).click()
        await new Promise((resolve) => setTimeout(resolve, 300))
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 2')).toBeVisible()
        await page.getByRole('button', { name: 'hide' }).click()

        await elements[1].click()
        await page.getByRole('button', { name: 'like' }).click()
        await new Promise((resolve) => setTimeout(resolve, 300))
        await page.getByRole('button', { name: 'like' }).click()
        await new Promise((resolve) => setTimeout(resolve, 300))
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 3')).toBeVisible()
        await page.getByRole('button', { name: 'hide' }).click()

        await elements[2].click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
        await page.getByRole('button', { name: 'hide' }).click()

        // Check every element in order by likes 3, 2, 1
        await elements[0].click()
        await expect(page.getByText('likes 3')).toBeVisible()
        await page.getByRole('button', { name: 'hide' }).click()

        await elements[1].click()
        await expect(page.getByText('likes 2')).toBeVisible()
        await page.getByRole('button', { name: 'hide' }).click()

        await elements[2].click()
        await expect(page.getByText('likes 1')).toBeVisible()
        await page.getByRole('button', { name: 'hide' }).click()
      })
    })
  })
})
