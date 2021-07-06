import { Box, Container, Grid, makeStyles, TextField } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import YouTube from 'react-youtube'
import { usePlaylistQuery } from '../../../graphql/generated/graphql-client'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '56.25%',
    },
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}))

const EditPage = () => {
  const classes = useStyles()

  const {
    query: { id },
  } = useRouter()

  const { data, loading } = usePlaylistQuery({
    variables: { id: parseInt(id?.toString()) },
  })

  console.log(data)
  console.log(loading)

  return (
    <Box mt={10} mx={5}>
      <Container>
        <Grid spacing={10} container>
          <Grid item sm={6} md={4} className={classes.wrapper}>
            {/* <div className={classes.content}> */}
            <YouTube
              containerClassName={classes.content}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  playsinline: 1,
                },
              }}
              videoId="eqr98KBmsJk"
            />
            {/* </div> */}
          </Grid>
          <Grid item sm={6} md={8}>
            <TextField label="Standard" />
          </Grid>
        </Grid>

        {id}
        {data?.playlist?.defaultBpm}
      </Container>
    </Box>
  )
}

export default EditPage
