import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Typography variant="h6">FreeBeat</Typography>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
