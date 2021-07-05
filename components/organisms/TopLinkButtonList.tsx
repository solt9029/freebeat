import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import NewPlaylistButton from './NewPlaylistButton'

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

function TopLinkButtonList() {
  const classes = useStyles()

  return (
    <>
      <NewPlaylistButton />
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        className={classes.button}
      >
        プレイリストを探す
      </Button>
    </>
  )
}

export default TopLinkButtonList
