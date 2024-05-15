import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ favorite }) => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks

  const filteredBooks = books.filter((book) => book.genres.includes(favorite))

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{favorite}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
