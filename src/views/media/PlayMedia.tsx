import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useMatch } from 'react-router-dom'
import { read } from '../../services/mediaService'
import Media from './Media'
import { TMedia } from './MediaList'

export default function PlayMedia() {
  const match = useMatch('/media/:mediaId')
  const [media, setMedia] = useState<TMedia | Record<string, never>>({})

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ mediaId: match.params.mediaId }, signal).then(data => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setMedia(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.mediaId])

  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={8} sm={8}>
          <Media media={media} />
        </Grid>
      </Grid>
    </div>
  )
}
