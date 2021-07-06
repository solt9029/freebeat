import {
  Box,
  Container,
  Grid,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import YouTube from 'react-youtube'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import {
  PlayCircleOutline,
  RepeatRounded,
  ShareOutlined,
  ShareRounded,
  Shuffle,
  ShuffleOutlined,
  ShuffleRounded,
} from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom } from '@fortawesome/free-solid-svg-icons'
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
    <div>
      <Box py={5}>
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
              <Box mt={2}>
                <PlayCircleOutline style={{ fontSize: 60 }} />
                <Shuffle style={{ fontSize: 60 }} />
                <ShareRounded style={{ fontSize: 60 }} />
                <RepeatRounded style={{ fontSize: 60 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default EditPage
