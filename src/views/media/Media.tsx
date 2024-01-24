import {
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Divider
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import auth from '../../auth/authHelper'
import { Link } from 'react-router-dom'
import DeleteMedia from './DeleteMedia'
import MediaPlayer from './MediaPlayer'

const baseUrl = 'http://localhost:3500'

export default function Media({ media, nextUrl = '', handleAutoplay = '' }) {
  const mediaUrl = media._id ? `${baseUrl}/api/medias/video/${media._id}` : null
  const nexturl = nextUrl
  return (
    <Card>
      <CardHeader
        title={media.title}
        action={<span>{media.views + ' views'}</span>}
        subheader={media.genre}
      />
      <MediaPlayer srcUrl={mediaUrl} nextUrl={nexturl} handleAutoplay={handleAutoplay} />
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>{media.postedBy.name && media.postedBy.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={media.postedBy.name}
            secondary={'Published on ' + new Date(media.created).toDateString()}
          />
          {auth.isAuthenticated().user && auth.isAuthenticated().user._id == media.postedBy._id && (
            <ListItemSecondaryAction>
              <Link to={'/media/edit/' + media._id}>
                <IconButton aria-label="Edit" color="secondary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteMedia mediaId={media._id} mediaTitle={media.title} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={media.description} />
        </ListItem>
      </List>
    </Card>
  )
}
