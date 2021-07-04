import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111111',
    },
  },
})

theme.typography.h1 = {
  fontSize: '3rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '4.4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '7rem',
  },
}

theme.typography.h2 = {
  fontSize: '1.5rem',
  fontWeight: 100,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.7rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.9rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.2rem',
  },
}

export default theme
