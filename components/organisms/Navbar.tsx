import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Container style={{ cursor: 'pointer' }}>
            <Typography variant="h6">FreeBeat</Typography>
          </Container>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
