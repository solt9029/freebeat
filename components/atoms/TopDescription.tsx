import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  description: {
    lineHeight: 1.8,
    fontSize: '1.1rem',
    fontWeight: 100,
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
