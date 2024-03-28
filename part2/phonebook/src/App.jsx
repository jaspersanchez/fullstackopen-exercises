import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

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

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{' '}
        <input
          value={filteredName}
          onChange={handleInputChange(setFilteredName)}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleAddName}>
        <div>
          name:{' '}
          <input value={newName} onChange={handleInputChange(setNewName)} />
        </div>
        <div>
          number:{' '}
          <input value={newNumber} onChange={handleInputChange(setNewNumber)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filteredName))
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  )
}

export default App
