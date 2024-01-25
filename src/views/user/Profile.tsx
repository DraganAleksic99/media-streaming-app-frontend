import { useState, useEffect } from 'react'
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  IconButton,
  Divider
} from '@mui/material'
import { Edit as EditIcon, Person as PersonIcon } from '@mui/icons-material'
import { Navigate, Link, useMatch } from 'react-router-dom'
import DeleteUser from './DeleteUser'
import auth from '../../auth/authHelper'
import { read } from '../../services/userService'
import { listByUser } from '../../services/mediaService'
import MediaList from '../media/MediaList'

type TUser = {
  _id: string
  name: string
  about: string
  email: string
  created: Date
  updated: Date
}

const baseUrl = 'http://localhost:3500'

export default function Profile() {
  const match = useMatch('/user/:userId')
  const userId = match.params.userId

  const [user, setUser] = useState<TUser | Record<string, never>>({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const [media, setMedia] = useState([])

  useEffect(() => {
    const jwt = auth.isAuthenticated()
    const abortController = new AbortController()
    const signal = abortController.signal

    read(
      {
        userId
      },
      { t: jwt.token },
      signal
    ).then(data => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    // return function cleanup() {
    //   abortController.abort()
    // }
  }, [userId])

  useEffect(() => {
    listByUser({
      userId: match.params.userId
    }).then(data => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setMedia(data)
      }
    })
  }, [match.params.userId])

  if (redirectToSignin) {
    return <Navigate to="/signin" />
  }

  return (
    <Paper elevation={4}>
      <Typography variant="h6">Profile</Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={`${baseUrl}/api/users/photo/${userId}?${new Date().getTime()}`}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />{' '}
          {auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
            <ListItemSecondaryAction>
              <Link to={'/user/edit/' + user._id} state={user}>
                <IconButton aria-label="Edit" color="primary">
                  <EditIcon />
                </IconButton>
              </Link>
              <DeleteUser userId={user._id} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <ListItem>
          <ListItemText primary={user.about} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={'Joined: ' + new Date(user.created).toDateString()} />
        </ListItem>
        <ListItem>
          <MediaList media={media} />
        </ListItem>
      </List>
    </Paper>
  )
}
