import { useState } from 'react'
import auth from '../../auth/authHelper'
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon } from '@mui/material'
import { FileUpload } from '@mui/icons-material'
import { create } from '../../services/mediaService'
import { Navigate } from 'react-router-dom'

export default function NewMedia() {
  const [values, setValues] = useState({
    title: '',
    video: null,
    description: '',
    genre: '',
    redirect: false,
    error: '',
    mediaId: ''
  })
  const jwt = auth.isAuthenticated()

  const clickSubmit = () => {
    const mediaData = new FormData()
    values.title && mediaData.append('title', values.title)
    values.video && mediaData.append('video', values.video)
    values.description && mediaData.append('description', values.description)
    values.genre && mediaData.append('genre', values.genre)
    create(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      mediaData
    ).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', mediaId: data._id, redirect: true })
      }
    })
  }

  const handleChange = name => event => {
    const value = name === 'video' ? event.target.files[0] : event.target.value
    setValues({ ...values, [name]: value })
  }

  if (values.redirect) {
    return <Navigate to={'/media/' + values.mediaId} />
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h1">
          New Video
        </Typography>
        <input
          accept="video/*"
          onChange={handleChange('video')}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button color="secondary" variant="contained" component="span">
            Upload
            <FileUpload />
          </Button>
        </label>{' '}
        <span>{values.video ? values.video.name : ''}</span>
        <br />
        <TextField
          id="title"
          label="Title"
          value={values.title}
          onChange={handleChange('title')}
          margin="normal"
        />
        <br />
        <TextField
          id="multiline-flexible"
          label="Description"
          multiline
          rows="2"
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
        />
        <br />
        <TextField
          id="genre"
          label="Genre"
          value={values.genre}
          onChange={handleChange('genre')}
          margin="normal"
        />
        <br />
        <br />{' '}
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error">error</Icon>
            {values.error}
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
