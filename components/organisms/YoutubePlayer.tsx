import { makeStyles } from '@material-ui/core'
import arrayShuffle from 'array-shuffle'
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
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    const bpm = state.videos.find(
      (video) => video.id === state.playingVideoId,
    )?.bpm
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
  }, [state.videos, state.defaultBpm, state.playingVideoId])

  const handlePlay = () => {
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
          loop={true}
          playbackRate={state.playbackRate}
          onPlay={handlePlay}
          url={state.youtubeVideoUrls}
        />
      </div>
    </div>
  )
}

export default YoutubePlayer
