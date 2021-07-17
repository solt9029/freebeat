import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { useRouter } from 'next/dist/client/router'

const useStyles = makeStyles(() => ({
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '1rem',
  },
  cardHeader: {
    display: 'block',
    overflow: 'hidden',
  },
  cardHeaderRoot: {
    overflow: 'hidden',
  },
  cardHeaderContent: {
    overflow: 'hidden',
  },
}))

const IndexPage = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <Box pt={4}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
            <Card variant="outlined" style={{ width: '100%' }}>
              <CardMedia
                image="https://i.ytimg.com/vi/ENcnYh79dUY/mqdefault.jpg"
                style={{
                  height: 0,
                  paddingTop: '56.25%',
                }}
              />
              <CardHeader
                classes={{
                  root: classes.cardHeaderRoot,
                  content: classes.cardHeaderContent,
                }}
                avatar={<Avatar component="span" aria-label="recipe"></Avatar>}
                title={
                  <div style={{ width: '100%' }}>
                    <Typography
                      component="div"
                      noWrap
                      className={classes.title}
                    >
                      作業用プレイリストああああああaaaaa
                    </Typography>
                  </div>
                }
                subheader={'BPM150・2021年7月14日'}
              />
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
            <Card variant="outlined" style={{ width: '100%' }}>
              <CardMedia
                image="https://i.ytimg.com/vi/ENcnYh79dUY/mqdefault.jpg"
                style={{
                  height: 0,
                  paddingTop: '56.25%',
                }}
              />
              <CardHeader
                classes={{
                  root: classes.cardHeaderRoot,
                  content: classes.cardHeaderContent,
                }}
                avatar={<Avatar component="span" aria-label="recipe"></Avatar>}
                title={
                  <div style={{ width: '100%' }}>
                    <Typography
                      component="div"
                      noWrap
                      className={classes.title}
                    >
                      作業用プレイリストああああああaaaaa
                    </Typography>
                  </div>
                }
                subheader={'BPM150・2021年7月14日'}
              />
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
            <Card variant="outlined" style={{ width: '100%' }}>
              <CardMedia
                image="https://i.ytimg.com/vi/ENcnYh79dUY/mqdefault.jpg"
                style={{
                  height: 0,
                  paddingTop: '56.25%',
                }}
              />
              <CardHeader
                classes={{
                  root: classes.cardHeaderRoot,
                  content: classes.cardHeaderContent,
                }}
                avatar={<Avatar component="span" aria-label="recipe"></Avatar>}
                title={
                  <div style={{ width: '100%' }}>
                    <Typography
                      component="div"
                      noWrap
                      className={classes.title}
                    >
                      作業用プレイリストああああああaaaaa
                    </Typography>
                  </div>
                }
                subheader={'BPM150・2021年7月14日'}
              />
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12} zeroMinWidth>
            <Card variant="outlined" style={{ width: '100%' }}>
              <CardMedia
                image="https://i.ytimg.com/vi/ENcnYh79dUY/mqdefault.jpg"
                style={{
                  height: 0,
                  paddingTop: '56.25%',
                }}
              />
              <CardHeader
                classes={{
                  root: classes.cardHeaderRoot,
                  content: classes.cardHeaderContent,
                }}
                avatar={<Avatar component="span" aria-label="recipe"></Avatar>}
                title={
                  <div style={{ width: '100%' }}>
                    <Typography
                      component="div"
                      noWrap
                      className={classes.title}
                    >
                      作業用プレイリストああああああaaaaa
                    </Typography>
                  </div>
                }
                subheader={'BPM150・2021年7月14日'}
              />
            </Card>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Pagination
            style={{ justifyContent: 'center', display: 'flex' }}
            count={10}
            page={2}
            variant="outlined"
            color="secondary"
            onChange={(event, page) => {
              router.push(`/playlists?page=${page}`)
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default IndexPage
