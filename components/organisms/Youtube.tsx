import { makeStyles } from '@material-ui/core'
import React from 'react'
import YouTube from 'react-youtube'

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
        videoId="eqr98KBmsJk"
      />
    </div>
  )
}

export default Youtube
