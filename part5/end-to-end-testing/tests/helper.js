const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  const textboxes = await page.getByRole('textbox').all()
  await textboxes[0].fill(title)
  await textboxes[1].fill(author)
  await textboxes[2].fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const assertNotif = async (page, expect, message, color) => {
  const notifDiv = page.getByTestId('notif')
  await expect(notifDiv).toContainText(message)
  await expect(notifDiv).toHaveCSS('border-style', 'solid')
  await expect(notifDiv).toHaveCSS('color', color)
}

export { loginWith, createBlog, assertNotif }
