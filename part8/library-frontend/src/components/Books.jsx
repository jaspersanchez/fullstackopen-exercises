import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Books = () => {
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState(null)

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: filter ? { genre: filter } : {},
  })

  useEffect(() => {
    if (data) {
      const books = data.allBooks
      setBooks(books)

      if (!filter) {
        const genreSet = new Set()
        books.forEach((book) => {
          book.genres.forEach((genre) => genreSet.add(genre))
        })
        setGenres([...genreSet])
      }
    }
  }, [data, filter, books])

  if (loading) return <div>loading</div>

  return (
    <div>
      <h2>books</h2>
      {filter && (
        <div>
          in genre <strong>{filter}</strong>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books
