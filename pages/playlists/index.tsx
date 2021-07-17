import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import Pagination from '../../components/organisms/Pagination'
import PlaylistCard from '../../components/organisms/PlaylistCard'

const IndexPage = () => {
  return (
    <Box pt={4}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
            <PlaylistCard
              defaultBpm={150}
              title="作業用プレイリストああああああaaaaa"
              firstYoutubeVideoId="ENcnYh79dUY"
              id={1}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
            <PlaylistCard
              defaultBpm={150}
              title="作業用プレイリストああああああaaaaa"
              firstYoutubeVideoId="ENcnYh79dUY"
              id={1}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
            <PlaylistCard
              defaultBpm={150}
              title="作業用プレイリストああああああaaaaa"
              firstYoutubeVideoId="ENcnYh79dUY"
              id={1}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
            <PlaylistCard
              defaultBpm={150}
              title="作業用プレイリストああああああaaaaa"
              firstYoutubeVideoId="ENcnYh79dUY"
              id={1}
            />
          </Grid>
        </Grid>
        <Box mt={5}>
          <Pagination />
        </Box>
      </Container>
    </Box>
  )
}

export default IndexPage
