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
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { Add, Home, Info, ListAlt, Menu } from '@material-ui/icons'
import { useCreatePlaylistMutation } from '../../graphql/generated/graphql-client'
import { setPlaylistKey } from '../../local-storage'
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
  const router = useRouter()

  const [createPlaylist] = useCreatePlaylistMutation({
    onCompleted: (data) => {
      setPlaylistKey(
        parseInt(data.createPlaylist.playlist.id),
        data.createPlaylist.playlist.key,
      )
      router.push(`/playlists/${data.createPlaylist.playlist.id}/edit`)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleClick = useCallback(() => {
    createPlaylist()
    setIsDrawerOpened(false)
  }, [createPlaylist])

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
            <Link href="/">
              <ListItem
                button
                onClick={() => {
                  setIsDrawerOpened(false)
                }}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="トップページ" />
              </ListItem>
            </Link>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="プレイリスト作成" />
            </ListItem>
            <Link href="/playlists">
              <ListItem
                button
                onClick={() => {
                  setIsDrawerOpened(false)
                }}
              >
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="プレイリスト一覧" />
              </ListItem>
            </Link>
            <Link href="/help">
              <ListItem
                button
                onClick={() => {
                  setIsDrawerOpened(false)
                }}
              >
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="FreeBeatの使い方" />
              </ListItem>
            </Link>
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
