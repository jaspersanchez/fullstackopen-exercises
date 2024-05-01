import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
