import { Box, Container, Grid } from '@material-ui/core'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PlaylistCard from '../../components/organisms/PlaylistCard'
import { usePlaylistsQuery } from '../../graphql/generated/graphql-client'

const IndexPage = () => {
  const { data, fetchMore, refetch } = usePlaylistsQuery({
    variables: { after: null },
    onCompleted: () => {},
  })

  const handleNext = () => {
    if (data && fetchMore) {
      fetchMore({
        variables: { after: data?.playlists?.pageInfo?.endCursor },
      })
    }
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <InfiniteScroll
      dataLength={data?.playlists?.edges?.length || 0}
      hasMore={data?.playlists?.pageInfo?.hasNextPage}
      loader={<h4>Loading...</h4>}
      next={handleNext}
      style={{ overflow: 'visible' }}
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
