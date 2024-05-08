import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the event handler with right details', async () => {
  const addBlog = vi.fn()
  const notifyWith = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} notifyWith={notifyWith} />)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(inputs[0], 'CSS is hard')
  await user.type(inputs[1], 'Mark Mijares')
  await user.type(inputs[2], 'https://digital-marks.com')
  await user.click(createButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('CSS is hard')
  expect(addBlog.mock.calls[0][0].author).toBe('Mark Mijares')
  expect(addBlog.mock.calls[0][0].url).toBe('https://digital-marks.com')
})
