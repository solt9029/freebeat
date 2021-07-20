import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.8rem',
    lineHeight: '3.4rem',
    fontWeight: 900,
    [theme.breakpoints.up('sm')]: {
      fontSize: '3.2rem',
      lineHeight: '5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.5rem',
      lineHeight: '5.5rem',
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
