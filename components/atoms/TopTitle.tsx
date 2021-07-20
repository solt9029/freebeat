import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: '3.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '4rem',
    },
  },
}))

function TopTitle({ children }: { children: React.ReactNode }) {
  const classes = useStyles()
  return (
    <Typography variant="h1" className={classes.title}>
      {children}
    </Typography>
  )
}

export default TopTitle
