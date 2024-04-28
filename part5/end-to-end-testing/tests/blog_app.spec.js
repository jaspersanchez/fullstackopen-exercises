const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

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

      const errorDiv = page.getByTestId('error')
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Jasper Sanchez')).not.toBeVisible()
    })
  })
})
