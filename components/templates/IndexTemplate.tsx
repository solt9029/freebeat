import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import TopDescription from '../atoms/TopDescription'
import TopTitle from '../atoms/TopTitle'
import PlaylistCard from '../organisms/PlaylistCard'
import TopLinkButtonList from '../organisms/TopLinkButtonList'

const useStyles = makeStyles((theme) => ({
  container: {
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
  topBox: {
    textAlign: 'center',
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
        <Box mx={2} mb={15} className={classes.topBox}>
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
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={6} xs={12} zeroMinWidth>
            <PlaylistCard
              defaultBpm={150}
              title={'mudai' || '無題'}
              firstYoutubeVideoId={'a'}
              createdAt={'2021/07/14'}
              id={1}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12} zeroMinWidth>
            <PlaylistCard
              defaultBpm={150}
              title={'mudai' || '無題'}
              firstYoutubeVideoId={'a'}
              createdAt={'2021/07/14'}
              id={1}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12} zeroMinWidth>
            <PlaylistCard
              defaultBpm={150}
              title={'mudai' || '無題'}
              firstYoutubeVideoId={'a'}
              createdAt={'2021/07/14'}
              id={1}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default IndexTemplate
