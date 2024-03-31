import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

const Input = ({ value, onChange, text }) => {
  return (
    <div>
      {text}: <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({
  onSubmit,
  nameValue,
  handleNewName,
  numberValue,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input value={nameValue} onChange={handleNewName} text="name" />
      <Input value={numberValue} onChange={handleNewNumber} text="number" />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filteredName }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filteredName.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleInputChange = (setState) => (event) =>
    setState(event.target.value)

  const handleAddName = (event) => {
    event.preventDefault()

    const personExists = persons.find((person) => person.name === newName)

    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
    })
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        value={filteredName}
        onChange={handleInputChange(setFilteredName)}
      />

      <h2>add a new</h2>

      <PersonForm
        onSubmit={handleAddName}
        nameValue={newName}
        handleNewName={handleInputChange(setNewName)}
        numberValue={newNumber}
        handleNewNumber={handleInputChange(setNewNumber)}
      />
      <h2>Numbers</h2>

      <Persons persons={persons} filteredName={filteredName} />
    </div>
  )
}

export default App
