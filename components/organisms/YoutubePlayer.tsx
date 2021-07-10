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
  const { state } = useContext(AppContext)

  const { data } = usePlaylistQuery({
    variables: { id: state.playlistId },
    onCompleted: () => {},
    onError: () => {},
  })

  const videoRef = useRef(null)

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
          ref={videoRef}
          width="100%"
          height="100%"
          playsinline
          controls
          loop
          playbackRate={2}
          // onReady=
          onPlay={() => {
            console.log(videoRef.current)
            // get currently playing video url!!
            console.log(videoRef.current?.player?.player?.player?.getVideoUrl())
          }}
          url={videoIds.map(
            (videoId) => `https://www.youtube.com/watch?v=${videoId}`,
          )}
        />
      </div>
    </div>
  )
}

export default YoutubePlayer
