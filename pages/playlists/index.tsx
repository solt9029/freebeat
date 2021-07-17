import { Box, Container, Grid } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'
import PlaylistCard from '../../components/organisms/PlaylistCard'
import { usePlaylistsQuery } from '../../graphql/generated/graphql-client'

const IndexPage = () => {
  const { data, fetchMore } = usePlaylistsQuery({
    variables: { after: null },
    onCompleted: () => {},
  })

  const handleNext = () => {
    console.log('next')
    fetchMore({
      variables: { after: data?.playlists?.pageInfo?.endCursor },
    })
  }

  return (
    <InfiniteScroll
      dataLength={data?.playlists?.edges?.length || 0}
      hasMore={data?.playlists?.pageInfo?.hasNextPage}
      loader={<h4>Loading...</h4>}
      next={handleNext}
    >
      <Box pt={4}>
        <Container fixed>
          <Grid container spacing={2}>
            {data &&
              data.playlists.edges.map((edge, index) => {
                return (
                  <Grid
                    item
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    zeroMinWidth
                    key={index}
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
        </Container>
      </Box>
    </InfiniteScroll>
  )
}

export default IndexPage
