import { Button, ButtonProps, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  button: {
    fontSize: '1rem',
    margin: '8px',
  },
}))

function TopButton(props: ButtonProps) {
  const classes = useStyles()
  return <Button {...props} className={classes.button} />
}

export default TopButton
