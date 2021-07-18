import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import {
  Add,
  Inbox,
  ListAlt,
  Mail,
  Menu,
  QuestionAnswer,
} from '@material-ui/icons'
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
        <div style={{ backgroundColor: '#111111' }}>
          <Box m={2} style={{ color: 'white' }}>
            FreeBeat
          </Box>
        </div>
        <Box mr={3} ml={1}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="プレイリスト作成" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="プレイリスト一覧" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="FreeBeatの使い方" />
            </ListItem>
          </List>
          <Box
            mx={2}
            mb={2}
            style={{
              position: 'fixed',
              bottom: 0,
            }}
          >
            Created by{' '}
            <a href="https://twitter.com/solt9029" target="_blank">
              @solt9029
            </a>
          </Box>
        </Box>
      </Drawer>
    </div>
  )
}

export default Navbar
