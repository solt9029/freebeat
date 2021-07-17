import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import SearchField from './SearchField'

function Navbar() {
  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar>
          <Link href="/">
            <Container style={{ cursor: 'pointer' }}>
              <Typography variant="h6">FreeBeat</Typography>
            </Container>
          </Link>
          <SearchField />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
