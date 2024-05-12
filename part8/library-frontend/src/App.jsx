import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes, Route, Link } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <div>
        <Link to="/authors">authors</Link> <Link to="/books">books</Link>{' '}
        <Link to="/add-book">add book</Link>
      </div>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
