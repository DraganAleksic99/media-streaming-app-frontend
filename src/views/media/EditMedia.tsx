import { useState, useEffect, ChangeEvent } from 'react'
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon } from '@mui/material'
import auth from '../../auth/authHelper'
import { read, update } from '../../services/mediaService'
import { Navigate, useMatch } from 'react-router-dom'
import { TMedia } from './MediaList'

export default function EditMedia() {
  const match = useMatch('/media/edit/:mediaId')
  const [media, setMedia] = useState<TMedia | Record<string, never>>({})
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ mediaId: match.params.mediaId }, signal).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setMedia(data)
      }
    })
    // return function cleanup() {
    //   abortController.abort()
    // }
  }, [match.params.mediaId])

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    update(
      {
        mediaId: media._id
      },
      {
        t: jwt.token
      },
      media
    ).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setRedirect(true)
      }
    })
  }

  const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const updatedMedia = { ...media }
    updatedMedia[name] = event.target.value
    setMedia(updatedMedia)
  }

  if (redirect) {
    return <Navigate to={'/media/' + media._id} />
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h1">
          Edit Video Details
        </Typography>
        <TextField
          id="title"
          label="Title"
          value={media.title || ''}
          onChange={handleChange('title')}
          margin="normal"
        />
        <br />
        <TextField
          id="multiline-flexible"
          label="Description"
          multiline
          rows="2"
          value={media.description || ''}
          onChange={handleChange('description')}
          margin="normal"
        />
        <br />
        <TextField
          id="genre"
          label="Genre"
          value={media.genre || ''}
          onChange={handleChange('genre')}
          margin="normal"
        />
        <br />
        <br />{' '}
        {error && (
          <Typography component="p" color="error">
            <Icon color="error">error</Icon>
            {error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}
