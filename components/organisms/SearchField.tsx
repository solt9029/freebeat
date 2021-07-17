import {
  alpha,
  createStyles,
  debounce,
  InputBase,
  makeStyles,
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { Search } from '@material-ui/icons'
import { useRouter } from 'next/dist/client/router'

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
)

function SearchField() {
  const classes = useStyles()
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  const pushRoute = useCallback(
    debounce((value: string) => {
      router.push(`/playlists?keyword=${value}`)
    }, 1000),
    [router],
  )

  const handleChange = useCallback(
    (event) => {
      setKeyword(event.target.value)
      pushRoute(event.target.value)
    },
    [setKeyword],
  )

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        value={keyword}
        onChange={handleChange}
        placeholder="検索"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

export default SearchField
