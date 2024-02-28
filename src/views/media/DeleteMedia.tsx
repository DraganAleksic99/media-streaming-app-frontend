import { useState } from 'react'
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import auth from '../../auth/authHelper'
import { remove } from '../../services/mediaService'
import { Navigate } from 'react-router-dom'

export default function DeleteMedia(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const clickButton = () => {
    setOpen(true)
  }
  const deleteMedia = () => {
    const jwt = auth.isAuthenticated()
    remove(
      {
        mediaId: props.mediaId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setRedirect(true)
      }
    })
  }

  const handleRequestClose = () => {
    setOpen(false)
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{'Delete ' + props.mediaTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete {props.mediaTitle} from your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteMedia} variant="contained" color="secondary" autoFocus={true}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
