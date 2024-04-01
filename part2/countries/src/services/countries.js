import axios from 'axios'
const countrybaseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = import.meta.env.VITE_API_KEY

const getAll = () => {
  const request = axios.get(`${countrybaseUrl}/api/all`)
  return request.then((request) => request.data)
}

const getWeather = (country) => {
  const request = axios.get(
    `${weatherBaseUrl}${country}&units=metric&appid=${api_key}`
  )
  return request.then((request) => request.data)
}

export default {
  getAll,
  getWeather,
}
