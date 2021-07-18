import { Box, Container, makeStyles } from '@material-ui/core'
import TopDescription from '../atoms/TopDescription'
import TopTitle from '../atoms/TopTitle'
import TopLinkButtonList from '../organisms/TopLinkButtonList'

const useStyles = makeStyles((theme) => ({
  container: {
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
  topDescription: {
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
  topLinkButtonList: {
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

const IndexTemplate = () => {
  const classes = useStyles()

  return (
    <Box mb={15}>
      <Container fixed className={classes.container}>
        <Box mx={2}>
          <TopTitle>統一されたBPMで集中して作業しよう</TopTitle>
          <Box className={classes.topDescription}>
            <TopDescription>
              FreeBeatは、YouTube動画でプレイリストを作り、好きなBPMに合わせた倍速再生ができる、作業用音楽プレイヤーです。
            </TopDescription>
          </Box>
          <Box className={classes.topLinkButtonList}>
            <TopLinkButtonList />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default IndexTemplate
