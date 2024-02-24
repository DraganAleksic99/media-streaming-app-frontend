import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

const baseUrl = 'https://media-streaming-app-backend-production.up.railway.app'

export type TMedia = {
  _id: string
  title: string
  description?: string
  genre?: string
  views: number
  postedBy: {
    _id: string
    name: string
  }
  created: string
}

type TProps = {
  media: TMedia[]
}

export default function MediaList({ media }: TProps) {
  return (
    <div className="home">
      <ImageList cols={3}>
        {media?.map((tile, i) => (
          <ImageListItem sx={{ height: '50px' }} key={i}>
            <Link to={'/media/' + tile._id}>
              <ReactPlayer
                url={baseUrl + '/api/medias/video/' + tile._id}
                width="100%"
                height="inherit"
                style={{ borderRadius: '20px' }}
              />
            </Link>
            <ImageListItemBar
              position="below"
              title={<Link to={'/media/' + tile._id}> {tile.title} </Link>}
              subtitle={
                <span>
                  <span>{tile.views} views</span>
                  <span>
                    <em>{tile.genre}</em>
                  </span>
                </span>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
