import {
  AppBar,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // textAlign: 'center',
    // height: '600px',
    paddingTop: '100px',
    backgroundColor: '#880000',
    color: 'white',
    width: '100%',
  },

  title: {
    fontSize: '8rem',
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
      <div className={classes.root}>
        <Container>
          <h1 className={classes.title}>
            統一されたBPMで
            <br />
            集中して作業しよう
          </h1>
        </Container>
      </div>
    </>
  )
}

export default IndexPage
