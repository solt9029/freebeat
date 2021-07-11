import { makeStyles } from '@material-ui/core'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactPlayer from 'react-player'
import YouTube from 'react-youtube'
import { usePlaylistQuery } from '../../graphql/generated/graphql-client'
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

  const [videoIds, setVideoIds] = useState<string[]>([])
  const { state, dispatch } = useContext(AppContext)

  const { data } = usePlaylistQuery({
    variables: { id: state.playlistId },
    onCompleted: () => {},
    onError: () => {},
  })

  const playerRef = useRef(null)

  useEffect(() => {
    if (videoIds.length === 0 && data) {
      setVideoIds(
        data.playlist.videos.edges.map((edge) => edge.node.youtubeVideoId),
      )
    }
  }, [data, setVideoIds, videoIds])

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
          onPlay={() => {
            const url = new URL(
              playerRef.current?.player?.player?.player?.getVideoUrl(),
            )
            const youtubeVideoId = url.searchParams.get('v')
            const bpm = state.videos.find(
              (video) => video.youtubeVideoId === youtubeVideoId,
            )?.bpm
            console.log(bpm)
            console.log(state.defaultBpm)

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
          }}
          url={state.videos.map(
            (video) =>
              `https://www.youtube.com/watch?v=${video.youtubeVideoId}`,
          )}
        />
      </div>
    </div>
  )
}

export default YoutubePlayer
