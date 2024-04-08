const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const date = new Date()

const getInfoPageHtml = (personCount, date) => {
  return `
    <p>Phonebook has info for ${personCount} people </p>
    <p>${date}</p>
`
}

app.get('/api/persons', (req, res) => {
  return res.json(persons)
})

app.get('/info', (req, res) => {
  const page = getInfoPageHtml(persons.length, date)
  return res.send(page)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)
  if (person) return res.json(person)

  return res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)

  return res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
