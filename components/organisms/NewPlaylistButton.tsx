import { Button, makeStyles } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useCreatePlaylistMutation } from '../../graphql/generated/graphql-client'

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '1rem',
    margin: '8px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.3rem',
    },
  },
}))

function NewPlaylistButton() {
  const classes = useStyles()

  const [createPlaylist] = useCreatePlaylistMutation({
    onCompleted: (data) => {
      console.log(data.createPlaylist.playlist.id)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleClick = useCallback(() => {
    createPlaylist()
  }, [createPlaylist])

  return (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      className={classes.button}
      onClick={handleClick}
    >
      プレイリストを作る
    </Button>
  )
}

export default NewPlaylistButton
