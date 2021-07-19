import { Box, CircularProgress, Container, Grid } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PlaylistCard from '../../components/organisms/PlaylistCard'
import { usePlaylistsQuery } from '../../graphql/generated/graphql-client'

const IndexPage = () => {
  const { isReady, query } = useRouter()

  const { data, fetchMore, refetch, called } = usePlaylistsQuery({
    variables: { keyword: query?.keyword?.toString(), first: 20 },
    onCompleted: () => {},
    skip: !isReady,
  })

  const handleNext = () => {
    if (data && called && fetchMore) {
      fetchMore({
        variables: { after: data?.playlists?.pageInfo?.endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }

          const newEdges = fetchMoreResult.playlists.edges
          const pageInfo = fetchMoreResult.playlists.pageInfo

          return {
            playlists: {
              ...previousResult.playlists,
              pageInfo,
              edges: [...previousResult.playlists.edges, ...newEdges],
            },
          }
        },
      })
    }
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <>
      <InfiniteScroll
        dataLength={data?.playlists?.edges?.length || 0}
        hasMore={data?.playlists?.pageInfo?.hasNextPage}
        loader={
          <Box my={3} style={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        }
        next={handleNext}
        style={{ overflow: 'visible' }}
      >
        <Box py={4}>
          <Container fixed>
            <h1>みんなの作成したプレイリスト</h1>
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
    </>
  )
}

export default IndexPage
