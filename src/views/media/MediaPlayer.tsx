import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import { IconButton, Icon, LinearProgress } from '@mui/material'
import {
  FullscreenOutlined,
  PlayCircleFilledWhiteOutlined,
  PauseCircleOutlineRounded,
  VolumeUpOutlined,
  VolumeOffOutlined,
  VolumeMuteOutlined,
  RepeatOneOutlined,
  ReplayOutlined
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

type Props = {
  srcUrl: string
  nextUrl: string
  handleAutoplay: string
}

export default function MediaPlayer({ srcUrl, nextUrl = '' }: Props) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [loop, setLoop] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [videoError, setVideoError] = useState(false)
  let playerRef = useRef(null)
  const [values, setValues] = useState({
    played: 0,
    loaded: 0,
    ended: false
  })

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        const fullscreen = screenfull.isFullscreen ? true : false
        setFullscreen(fullscreen)
      })
    }
  }, [])

  useEffect(() => {
    setVideoError(false)
  }, [srcUrl])

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  const toggleMuted = () => {
    setMuted(!muted)
  }

  const playPause = () => {
    setPlaying(!playing)
  }

  const onLoop = () => {
    setLoop(!loop)
  }

  const onProgress = progress => {
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      setValues({ ...values, played: progress.played, loaded: progress.loaded })
    }
  }

  const onClickFullscreen = () => {
    screenfull.request(findDOMNode(playerRef))
  }

  const onEnded = () => {
    if (loop) {
      setPlaying(true)
    } else {
      setValues({ ...values, ended: true })
      setPlaying(false)
    }
  }

  const onDuration = (duration: number) => {
    setDuration(duration)
  }

  const onSeekMouseDown = () => {
    setSeeking(true)
  }

  const onSeekChange = e => {
    setValues({
      ...values,
      played: parseFloat(e.target.value),
      ended: parseFloat(e.target.value) >= 1
    })
  }

  const onSeekMouseUp = e => {
    setSeeking(false)
    playerRef.seekTo(parseFloat(e.target.value))
  }

  const ref = player => {
    playerRef = player
  }

  const format = seconds => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    let mm = date.getUTCMinutes()
    const ss = ('0' + date.getUTCSeconds()).slice(-2)

    if (hh) {
      mm = ('0' + date.getUTCMinutes()).slice(-2)
      return `${hh}:${mm}:${ss}`
    }
    return `${mm}:${ss}`
  }

  const showVideoError = e => {
    console.log(e)
    setVideoError(true)
  }

  const handleRepeat = () => {
    setValues({ ...values, ended: false })
    setPlaying(true)
  }

  return (
    <div>
      {videoError && <p>Video Error. Try again later.</p>}
      <div>
        <ReactPlayer
          ref={ref}
          width={fullscreen ? '100%' : 'inherit'}
          height={fullscreen ? '100%' : 'inherit'}
          style={fullscreen ? { position: 'relative' } : { maxHeight: '500px' }}
          config={{ attributes: { style: { height: '100%', width: '100%' } } }}
          url={srcUrl}
          playing={playing}
          loop={loop}
          volume={volume}
          muted={muted}
          onEnded={onEnded}
          onError={showVideoError}
          onProgress={onProgress}
          onDuration={onDuration}
        />
        <br />
      </div>
      <div>
        <LinearProgress
          color="primary"
          variant="buffer"
          value={values.played * 100}
          valueBuffer={values.loaded * 100}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <IconButton color="primary" onClick={playPause}>
            <Icon sx={{ width: 'fit-content', height: 'fit-content', paddingTop: '6px' }}>
              {playing ? (
                <PauseCircleOutlineRounded fontSize="large" />
              ) : values.ended ? (
                <span onClick={handleRepeat}>
                  <ReplayOutlined fontSize="large" />
                </span>
              ) : (
                <PlayCircleFilledWhiteOutlined fontSize="large" />
              )}
            </Icon>
          </IconButton>
          <input
            type="range"
            min={0}
            max={1}
            value={values.played}
            step="any"
            onMouseDown={onSeekMouseDown}
            onChange={onSeekChange}
            onMouseUp={onSeekMouseUp}
          />
          <IconButton disabled={!nextUrl} color="primary">
            <Link to={nextUrl} style={{ color: 'inherit' }}>
              <Icon sx={{ width: 'fit-content' }}>next</Icon>
            </Link>
          </IconButton>
          <IconButton color="primary" onClick={toggleMuted}>
            <Icon sx={{ width: 'fit-content', height: 'fit-content', paddingTop: '6px' }}>
              {(volume > 0 && !muted && <VolumeUpOutlined fontSize="large" />) ||
                (muted && <VolumeOffOutlined fontSize="large" />) ||
                (volume == 0 && <VolumeMuteOutlined fontSize="large" />)}
            </Icon>
          </IconButton>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={muted ? 0 : volume}
            onChange={changeVolume}
          />
          <IconButton color={loop ? 'primary' : 'default'} onClick={onLoop}>
            <Icon sx={{ width: 'fit-content', height: 'fit-content', paddingTop: '6px' }}>
              <RepeatOneOutlined fontSize="large" />
            </Icon>
          </IconButton>
          <IconButton color="primary" onClick={onClickFullscreen} sx={{ padding: 0 }}>
            <Icon sx={{ width: 'fit-content', height: 'fit-content', paddingTop: '6px' }}>
              <FullscreenOutlined fontSize="large" />
            </Icon>
          </IconButton>
          <span style={{ float: 'right', padding: '10px', color: '#b83423' }}>
            <time dateTime={`P${Math.round(duration * values.played)}S`}>
              {format(duration * values.played)}
            </time>{' '}
            / <time dateTime={`P${Math.round(duration)}S`}>{format(duration)}</time>
          </span>
        </div>
      </div>
    </div>
  )
}
