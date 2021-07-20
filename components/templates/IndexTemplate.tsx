import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import { useEffect } from 'react'
import { usePlaylistsQuery } from '../../graphql/generated/graphql-client'
import TopDescription from '../atoms/TopDescription'
import TopTitle from '../atoms/TopTitle'
import PlaylistCard from '../organisms/PlaylistCard'
import TopLinkButtonList from '../organisms/TopLinkButtonList'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '55px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '55px',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '60px',
    },
  },
  topBox: {
    textAlign: 'center',
  },
  topDescription: {
    marginTop: '50px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '60px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '60px',
    },
  },
  topLinkButtonList: {
    marginTop: '60px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '65px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '70px',
    },
  },
}))

const IndexTemplate = () => {
  const classes = useStyles()

  const recentPlaylistsQuery = usePlaylistsQuery({
    variables: { first: 3 },
  })
  const recommendedPlaylistsQuery = usePlaylistsQuery({
    variables: { first: 3, ids: [1, 2, 3] },
  })

  useEffect(() => {
    recentPlaylistsQuery.refetch()
    recommendedPlaylistsQuery.refetch()
  }, [recentPlaylistsQuery.refetch, recommendedPlaylistsQuery.refetch])

  return (
    <Box mb={6}>
      <Container fixed className={classes.container}>
        <Box mx={2} mb={10} className={classes.topBox}>
          <Box mb={6}>
            <img
              src="/icon.png"
              width="100px"
              style={{ borderRadius: '25%' }}
            />
          </Box>
          <TopTitle>
            <span style={{ display: 'inline-block' }}>統一されたBPMで</span>
            <span style={{ display: 'inline-block' }}>集中して作業しよう</span>
          </TopTitle>
          <Box className={classes.topDescription}>
            <TopDescription>
              FreeBeatは、YouTube動画でプレイリストを作り、
              <br />
              好きなBPMに合わせた倍速再生ができる、作業用音楽プレイヤーです。
            </TopDescription>
          </Box>
          <Box className={classes.topLinkButtonList}>
            <TopLinkButtonList />
          </Box>
        </Box>
        <Box mb={10}>
          <h2>おすすめプレイリスト</h2>
          <Grid container spacing={2}>
            {recommendedPlaylistsQuery.data &&
              recommendedPlaylistsQuery.data.playlists.edges.map((edge) => {
                return (
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={4}
                    xs={12}
                    zeroMinWidth
                    key={edge.node.id}
                  >
                    <PlaylistCard
                      defaultBpm={edge.node.defaultBpm}
                      title={edge.node.title || '無題'}
                      firstYoutubeVideoId={
                        edge.node.videos.edges[0]?.node?.youtubeVideoId
                      }
                      createdAt={edge.node.createdAt}
                      id={parseInt(edge.node.id)}
                    />
                  </Grid>
                )
              })}
          </Grid>
        </Box>
        <Box mb={10}>
          <h2>最近作成されたプレイリスト</h2>
          <Grid container spacing={2}>
            {recentPlaylistsQuery.data &&
              recentPlaylistsQuery.data.playlists.edges.map((edge) => {
                return (
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={4}
                    xs={12}
                    zeroMinWidth
                    key={edge.node.id}
                  >
                    <PlaylistCard
                      defaultBpm={edge.node.defaultBpm}
                      title={edge.node.title || '無題'}
                      firstYoutubeVideoId={
                        edge.node.videos.edges[0]?.node?.youtubeVideoId
                      }
                      createdAt={edge.node.createdAt}
                      id={parseInt(edge.node.id)}
                    />
                  </Grid>
                )
              })}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default IndexTemplate
