import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((request) => request.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((request) => request.data)
}

const discard = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((request) => request.data)
}

export default {
  getAll,
  create,
  discard,
  update,
}
