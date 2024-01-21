import { AppBar, Toolbar, Button, IconButton } from '@mui/material'
import { Home as HomeIcon, AddBox as AddBoxIcon } from '@mui/icons-material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import auth from '../auth/authHelper'

export default function Navigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = path => {
    if (pathname == path) return { color: '#f99085' }
    else return { color: '#efdcd5' }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div>
          <Link to="/">
            <IconButton aria-label="Home" style={isActive('/')}>
              <HomeIcon />
            </IconButton>
          </Link>
        </div>
        <div style={{ position: 'absolute', right: '10px' }}>
          <span style={{ float: 'right' }}>
            {!auth.isAuthenticated() && (
              <span>
                <Link to="/signup">
                  <Button style={isActive('/signup')}>Sign up</Button>
                </Link>
                <Link to="/signin">
                  <Button style={isActive('/signin')}>Sign In</Button>
                </Link>
              </span>
            )}
            {auth.isAuthenticated() && (
              <span>
                <Link to="/media/new">
                  <Button style={isActive('/media/new')}>
                    <AddBoxIcon style={{ marginRight: '8px' }} /> Add Media
                  </Button>
                </Link>
                <Link to={'/user/' + auth.isAuthenticated().user._id}>
                  <Button style={isActive('/user/' + auth.isAuthenticated().user._id)}>
                    My Profile
                  </Button>
                </Link>
                <Button
                  color="inherit"
                  onClick={() => {
                    auth.clearJWT(navigate('/'))
                  }}
                >
                  Sign out
                </Button>
              </span>
            )}
          </span>
        </div>
      </Toolbar>
    </AppBar>
  )
}
