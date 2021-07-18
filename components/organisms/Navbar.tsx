import {
  AppBar,
  Container,
  IconButton,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import SearchField from './SearchField'

function Navbar() {
  const { pathname } = useRouter()

  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar>
          <Container>
            <Typography variant="h6" style={{ textDecoration: 'none' }}>
              <Link href="/">
                <span style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  FreeBeat
                </span>
              </Link>
            </Typography>
          </Container>

          {pathname === '/playlists' && <SearchField />}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
