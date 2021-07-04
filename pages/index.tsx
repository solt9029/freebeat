import {
  AppBar,
  Box,
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
      paddingTop: '120px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '140px',
    },
  },
  descriptionBox: {
    marginTop: '70px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '90px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '120px',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '140px',
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
        </Box>
      </Container>
    </>
  )
}

export default IndexPage
