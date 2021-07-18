import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { Inbox, Mail, Menu } from '@material-ui/icons'
import SearchField from './SearchField'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}))

function Navbar() {
  const classes = useStyles()
  const { pathname } = useRouter()
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container fixed>
          <Toolbar>
            <IconButton
              onClick={() => {
                setIsDrawerOpened(true)
              }}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link href="/">
                <span style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  FreeBeat
                </span>
              </Link>
            </Typography>
            {pathname === '/playlists' && <SearchField />}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpened}
        onClose={() => {
          setIsDrawerOpened(false)
        }}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

export default Navbar
