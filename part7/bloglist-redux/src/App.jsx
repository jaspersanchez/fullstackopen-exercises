import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import useLoggedUser from './hooks/useLoggedUser'

const App = () => {
  const user = useLoggedUser()

  if (user === null) {
    return <LoginForm />
  }

  return <BlogList />
}

export default App
