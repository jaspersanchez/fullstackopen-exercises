import { useState, useEffect } from 'react'
import countryService from './services/countries'

const FilteredCountry = ({ country, weather }) => {
  console.log(weather)
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags['png']} alt={country.flags['alt']} height={150} />
      <h2>Weather in {country.name.common} Celcius</h2>
      <div>temperature {weather.main.temp}</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getAll().then((initialData) => setCountries(initialData))
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      countryService
        .getWeather(selectedCountry.name.common)
        .then((initialWeather) => setWeather(initialWeather))
        .catch((error) => console.log(error))
    }
  }, [selectedCountry])

  if (!countries) {
    return
  }

  const filteredCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  )

  const handleChange = (event) => {
    const filteredCountry = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    )

    if (filteredCountry.length === 1) {
      setSelectedCountry(filteredCountry[0])
    } else {
      setSelectedCountry(null)
    }
    setValue(event.target.value)
  }

  const handleSelectedCountry = (country) => setSelectedCountry(country)

  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
      {filteredCountry.length === 1
        ? weather && (
            <FilteredCountry country={selectedCountry} weather={weather} />
          )
        : value &&
          (filteredCountry.length > 10 ? (
            <div>Too many matches, specify another filter</div>
          ) : (
            filteredCountry.map((country) => (
              <div key={country.area}>
                <span>{country.name.common}</span>{' '}
                <button onClick={() => handleSelectedCountry(country)}>
                  show
                </button>
                {selectedCountry &&
                  selectedCountry.name.common === country.name.common &&
                  weather && (
                    <FilteredCountry country={country} weather={weather} />
                  )}
              </div>
            ))
          ))}
    </div>
  )
}

export default App
