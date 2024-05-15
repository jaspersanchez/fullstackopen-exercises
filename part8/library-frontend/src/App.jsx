import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient, useQuery } from '@apollo/client'
import Recommend from './components/Recommend'
import { ME } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  const result = useQuery(ME)

  useEffect(() => {
    const token = window.localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (result.loading) return <div>loading...</div>

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <Link to="/authors">authors</Link> <Link to="/">books</Link>{' '}
        {token ? (
          <>
            <Link to="/add-book">add book</Link>{' '}
            <Link to="/recommended">recommended</Link>{' '}
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/add-book" element={<NewBook token={token} />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route
          path="/recommended"
          element={<Recommend favorite={result.data.me.favoriteGenre} />}
        />
      </Routes>
    </div>
  )
}

export default App
