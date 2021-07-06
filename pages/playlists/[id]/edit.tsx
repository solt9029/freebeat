import {
  Box,
  Button,
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
  button: {
    width: '100%',
    // bottom: 0,
    // height: '100%',
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
              <Grid container spacing={2}>
                <Grid item lg={12} xs={12}>
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
                <Grid item sm={6} xs={12}>
                  <TextField
                    className={classes.form}
                    InputProps={{
                      classes: {
                        input: classes.formInput,
                      },
                    }}
                    label="デフォルトのBPM"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    className={classes.form}
                    InputProps={{
                      classes: {
                        input: classes.formInput,
                      },
                    }}
                    label="編集キー"
                  />
                  <small>プレイリストを編集するために必要な暗号です。</small>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <PlayCircleOutline style={{ fontSize: 40 }} />
                  <Shuffle style={{ fontSize: 40 }} />
                  <ShareRounded style={{ fontSize: 40 }} />
                  <RepeatRounded style={{ fontSize: 40 }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={10}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={9} md={10}>
                <TextField
                  className={classes.form}
                  InputProps={{
                    classes: {
                      input: classes.formInput,
                    },
                  }}
                  label="YouTubeの動画またはプレイリストのURL"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={2}
                style={{ display: 'flex', alignItems: 'flex-end' }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  登録
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default EditPage
