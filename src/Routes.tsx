import { Route, Routes } from 'react-router'
import Signin from './Signin'
import Signup from './Signup'
import Home from './Home'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Route>
    </Routes>
  )
}

export default MainRouter
