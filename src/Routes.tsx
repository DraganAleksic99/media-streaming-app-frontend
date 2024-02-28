import { Route, Routes } from 'react-router'
import Signin from './Signin'
import Signup from './Signup'
import Home from './Home'
import Profile from './views/user/Profile'
import EditProfile from './views/user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import NewMedia from './views/media/NewMedia'
import EditMedia from './views/media/EditMedia'
import PlayMedia from './views/media/PlayMedia'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/user/edit/:userId" element={<EditProfile />} />
        <Route
          path="/media/new"
          element={
            <PrivateRoute>
              <NewMedia />
            </PrivateRoute>
          }
        />
        <Route
          path="/media/edit/:mediaId"
          element={
            <PrivateRoute>
              <EditMedia />
            </PrivateRoute>
          }
        />
        <Route path="/media/:mediaId" element={<PlayMedia />} />
      </Route>
    </Routes>
  )
}

export default MainRouter
