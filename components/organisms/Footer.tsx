import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#111111',
    textAlign: 'center',
    color: 'white',
  },
}))

function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Box p={2}>
        Copyright ©{' '}
        <a
          style={{ textDecoration: 'none', color: 'white' }}
          href="https://twitter.com/solt9029"
          target="_blank"
        >
          @solt9029
        </a>
        . All Rights Reserved.
      </Box>
    </footer>
  )
}

export default Footer
