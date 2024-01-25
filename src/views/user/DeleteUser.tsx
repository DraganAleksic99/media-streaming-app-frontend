import { useState } from 'react'
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import auth from '../../auth/authHelper'
import { remove } from '../../services/userService'
import { Navigate } from 'react-router-dom'

export default function DeleteUser({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteAccount = () => {
    remove(
      {
        userId: userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => console.log('deleted'))
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
        <DialogTitle>{'Delete Account'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary" autoFocus={true}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
