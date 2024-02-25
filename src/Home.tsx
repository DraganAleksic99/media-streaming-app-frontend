import { Card, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { listPopular } from './services/mediaService'
import MediaList from './views/media/MediaList'

export default function Home() {
  const [media, setMedia] = useState([])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listPopular(signal).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setMedia(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      <Card>
        <Typography variant="h4">Popular Videos</Typography>
        <MediaList media={media} />
      </Card>
    </div>
  )
}
