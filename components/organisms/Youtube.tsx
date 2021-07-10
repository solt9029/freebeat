import { makeStyles } from '@material-ui/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
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

function Youtube() {
  const classes = useStyles()

  const [videoId, setVideoId] = useState<string | undefined>(undefined)
  const { state } = useContext(AppContext)

  const { data } = usePlaylistQuery({
    variables: { id: state.playlistId },
    onCompleted: () => {},
    onError: () => {},
  })

  useEffect(() => {
    if (
      videoId === undefined &&
      data &&
      data.playlist.videos.edges.length > 0
    ) {
      setVideoId(data.playlist.videos.edges[0].node.youtubeVideoId)
    }
  }, [data, setVideoId, videoId])

  return (
    <div className={classes.wrapper}>
      <YouTube
        containerClassName={classes.content}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            playsinline: 1,
          },
        }}
        videoId={videoId}
      />
    </div>
  )
}

export default Youtube
