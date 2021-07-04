import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  description: {
    lineHeight: 1.8,
    fontSize: '1.5rem',
    fontWeight: 100,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.7rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.9rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2.2rem',
    },
  },
}))

function TopDescription({ children }: { children: React.ReactNode }) {
  const classes = useStyles()

  return (
    <Typography variant="h2" className={classes.description}>
      {children}
    </Typography>
  )
}

export default TopDescription
