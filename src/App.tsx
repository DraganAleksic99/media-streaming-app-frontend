import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Navigation from './components/Navigation'
import MainRouter from './Routes'

function App() {
  return (
    <div className="app">
      <Router>
        <CssBaseline />
        <Navigation />
        <MainRouter />
      </Router>
    </div>
  )
}

export default App
