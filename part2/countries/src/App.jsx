import { useState, useEffect } from 'react'
import countryService from './services/countries'

const FilteredCountry = ({ country }) => {
  console.log(country)
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
    </>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService.getAll().then((initialData) => setCountries(initialData))
  }, [])

  if (!countries) {
    return
  }

  const filteredCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  )

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSelectedCountry = (country) => setSelectedCountry(country)

  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
      {value &&
        (filteredCountry.length === 1 ? (
          <FilteredCountry country={filteredCountry[0]} />
        ) : filteredCountry.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : (
          filteredCountry.map((country) => (
            <div key={country.area}>
              <span>{country.name.common}</span>{' '}
              <button onClick={() => handleSelectedCountry(country)}>
                show
              </button>
              {selectedCountry && selectedCountry.area === country.area && (
                <FilteredCountry country={country} />
              )}
            </div>
          ))
        ))}
    </div>
  )
}

export default App
