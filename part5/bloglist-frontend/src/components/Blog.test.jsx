import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      id: '1',
      title: 'CSS is hard',
      author: 'Mark Mijares',
      url: 'https://digital-marks.com',
      likes: 23,
      user: {
        id: '1',
        username: 'djasper',
        name: 'Jasper Sanchez',
      },
    }

    container = render(<Blog blog={blog} />).container
  })

  test('renders title and author', async () => {
    await screen.findAllByText('CSS is hard Mark Mijares')
  })

  test('at start the url or number of likes are not displayed', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('after button click url and number of likes are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
  })
})
