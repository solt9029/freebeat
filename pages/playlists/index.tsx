import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import Pagination from '../../components/organisms/Pagination'
import PlaylistCard from '../../components/organisms/PlaylistCard'
import { usePlaylistsQuery } from '../../graphql/generated/graphql-client'

const IndexPage = () => {
  const { data, fetchMore } = usePlaylistsQuery({
    variables: { after: null },
    onCompleted: () => {},
  })

  return (
    <Box pt={4}>
      <Container fixed>
        <Grid container spacing={2}>
          {data &&
            data.playlists.edges.map((edge) => {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
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
      </Container>
    </Box>
  )
}

export default IndexPage
