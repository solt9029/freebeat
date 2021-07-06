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
      paddingTop: '60%',
    },
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  form: {
    width: '100%',
  },
  formInput: {
    fontSize: '1.5rem',
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
    <Box mt={5}>
      <Container>
        <Grid spacing={3} container>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.wrapper}>
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
            </div>

            {/* </div> */}
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <TextField
              className={classes.form}
              InputProps={{
                classes: {
                  input: classes.formInput,
                },
              }}
              label="タイトル"
            />
          </Grid>
        </Grid>

        {id}
        {data?.playlist?.defaultBpm}
      </Container>
    </Box>
  )
}

export default EditPage
