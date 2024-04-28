const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, assertNotif } = require('./helper')

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
      await expect(page.getByText('Likes 0')).toBeVisible()
      await expect(
        page.getByText('Jasper Sanchez', { exact: true }),
      ).toBeVisible()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    })
  })
})
