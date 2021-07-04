import {
  AppBar,
  Box,
  Button,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  titleBox: {
    textAlign: 'center',
    paddingTop: '70px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '90px',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '100px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '100px',
    },
  },
  descriptionBox: {
    marginTop: '60px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '70px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '80px',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '90px',
    },
  },
  buttonBox: {
    marginTop: '70px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '90px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '100px',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '110px',
    },
  },
  button: {
    fontSize: '1rem',
    margin: '8px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.3rem',
    },
  },
}))

const IndexPage = () => {
  const classes = useStyles()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Typography variant="h6">FreeBeat</Typography>
          </Container>
        </Toolbar>
      </AppBar>

      <Container fixed className={classes.titleBox}>
        <Box mx={2}>
          <Typography variant="h1">
            統一されたBPMで集中して作業しよう
          </Typography>
          <Box className={classes.descriptionBox}>
            <Typography variant="h2" style={{ lineHeight: 1.8 }}>
              FreeBeatは、YouTube動画でプレイリストを作り、好きなBPMに合わせた倍速再生ができる、作業用音楽プレイヤーです。
            </Typography>
          </Box>
          <Box className={classes.buttonBox}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
            >
              プレイリストを作る
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              className={classes.button}
            >
              プレイリストを探す
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default IndexPage
