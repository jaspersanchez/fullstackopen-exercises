import { useEffect, useState } from 'react'
import personService from './services/persons'

const Notification = ({ successMessage, errorMessage }) => {
  if ((successMessage || errorMessage) === null) {
    return null
  }
  const notifStyle = (successMessage && 'success') || (errorMessage && 'error')

  return <div className={notifStyle}>{successMessage || errorMessage}</div>
}

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

const Persons = ({ persons, filteredName, handleDeletePersonClick }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filteredName.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}{' '}
            <button onClick={() => handleDeletePersonClick(person)}>
              delete
            </button>
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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleInputChange = (setState) => (event) =>
    setState(event.target.value)

  const handleUpdateName = (personExists) => {
    if (
      window.confirm(
        `${personExists.name} is already aded to phonebook, replace the old number with a new one?`
      )
    ) {
      const newObject = {
        ...personExists,
        number: newNumber,
      }
      personService
        .update(newObject.id, newObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          )
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${personExists.name} has already been removed from server`
          )
          setTimeout(() => setErrorMessage(null), 5000)
          setPersons(persons.filter((person) => person.id !== personExists.id))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleAddName = (event) => {
    event.preventDefault()

    const personExists = persons.find((person) => person.name === newName)

    if (personExists) {
      handleUpdateName(personExists)

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setSuccessMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => setSuccessMessage(null), 5000)
      setNewName('')
      setNewNumber('')
    })
  }

  const handleDeletePersonClick = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.discard(person.id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

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

      <Persons
        persons={persons}
        filteredName={filteredName}
        handleDeletePersonClick={handleDeletePersonClick}
      />
    </div>
  )
}

export default App
