import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select'

const EditBook = () => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR)

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return <div>loading</div>

  const authors = result.data.allAuthors

  const options = authors.map((author) => {
    const authorName = author.name
    return { value: authorName, label: authorName }
  })

  const submit = (e) => {
    e.preventDefault()

    updateAuthor({ variables: { name: name.value, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditBook
