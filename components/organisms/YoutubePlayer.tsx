import { makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { AppContext } from '../../pages/_app'

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '60%',
    },
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}))

function YoutubePlayer() {
  const classes = useStyles()
  const playerRef = useRef(null)
  const [playingVideoId, setPlayingVideoId] = useState<number | undefined>(
    undefined,
  )
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    const bpm = state.videos.find((video) => video.id === playingVideoId)?.bpm
    if (bpm && state.defaultBpm) {
      dispatch({
        type: 'SET_PLAYBACK_RATE',
        payload: state.defaultBpm / bpm,
      })
    } else {
      dispatch({
        type: 'SET_PLAYBACK_RATE',
        payload: 1,
      })
    }
  }, [state.videos, state.defaultBpm, playingVideoId])

  const handlePlay = () => {
    const url = new URL(
      playerRef.current?.player?.player?.player?.getVideoUrl(),
    )
    const youtubeVideoId = url.searchParams.get('v')
    const videoId = state.videos.find(
      (video) => video.youtubeVideoId === youtubeVideoId,
    )?.id
    setPlayingVideoId(videoId)
  }

  const url = state.videos.map(
    (video) => `https://www.youtube.com/watch?v=${video.youtubeVideoId}`,
  )

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          playsinline
          controls
          loop
          playbackRate={state.playbackRate}
          onPlay={handlePlay}
          url={url}
        />
      </div>
    </div>
  )
}

export default YoutubePlayer
