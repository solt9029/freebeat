import { Box, Container, makeStyles } from '@material-ui/core'
import TopDescription from '../components/atoms/TopDescription'
import TopTitle from '../components/atoms/TopTitle'
import TopLinkButtonList from '../components/organisms/TopLinkButtonList'

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
}))

const IndexPage = () => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.titleBox}>
      <Box mx={2}>
        <TopTitle>統一されたBPMで集中して作業しよう</TopTitle>
        <Box className={classes.descriptionBox}>
          <TopDescription>
            FreeBeatは、YouTube動画でプレイリストを作り、好きなBPMに合わせた倍速再生ができる、作業用音楽プレイヤーです。
          </TopDescription>
        </Box>
        <Box className={classes.buttonBox}>
          <TopLinkButtonList />
        </Box>
      </Box>
    </Container>
  )
}

export default IndexPage
