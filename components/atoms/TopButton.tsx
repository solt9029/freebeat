import { Button, ButtonProps, makeStyles } from '@material-ui/core'
import React from 'react'

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

function TopButton(props: ButtonProps) {
  const classes = useStyles()
  return <Button {...props} className={classes.button} />
}

export default TopButton
