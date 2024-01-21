import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'
import MainRouter from './Routes'

function App() {
  return (
    <Router>
      <Navigation />
      <MainRouter />
    </Router>
  )
}

export default App
