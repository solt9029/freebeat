import { makeStyles } from '@material-ui/core'
import React, { useContext, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { AppContext } from '../../contexts'

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
  const { state, dispatch } = useContext(AppContext)
  const [isReady, setIsReady] = useState(false)

  const handlePlay = () => {
    playerRef.current?.getInternalPlayer()?.setLoop(true)
    const url = new URL(
      playerRef.current?.player?.player?.player?.getVideoUrl(),
    )
    const youtubeVideoId = url.searchParams.get('v')
    const videoId = state.videos.find(
      (video) => video.youtubeVideoId === youtubeVideoId,
    )?.id
    dispatch({ type: 'SET_PLAYING_VIDEO_ID', payload: videoId })
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          playsinline
          controls
          playbackRate={state.playbackRate}
          onPlay={handlePlay}
          onReady={() => {
            setIsReady(true)
          }}
          url={isReady ? state.youtubeVideoUrls : []}
        />
      </div>
    </div>
  )
}

export default YoutubePlayer
