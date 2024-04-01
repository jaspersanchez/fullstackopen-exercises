import { useState, useEffect } from 'react'
import countryService from './services/countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)

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

  console.log(filteredCountry)

  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
      {value &&
        (filteredCountry.length === 1 ? (
          <>
            <h2>{filteredCountry[0].name.common}</h2>
            <div>capital {filteredCountry[0].capital}</div>
            <div>area {filteredCountry[0].area}</div>
            <h3>languages:</h3>
            <ul>
              {Object.keys(filteredCountry[0].languages).map((key) => (
                <li key={key}>{filteredCountry[0].languages[key]}</li>
              ))}
            </ul>
            <img
              src={filteredCountry[0].flags['png']}
              alt={filteredCountry[0].flags['alt']}
              height={150}
            />
          </>
        ) : filteredCountry.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : (
          filteredCountry.map((country) => (
            <div key={country.area}>{country.name.common}</div>
          ))
        ))}
    </div>
  )
}

export default App
