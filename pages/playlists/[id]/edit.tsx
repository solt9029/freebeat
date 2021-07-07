import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import YouTube from 'react-youtube'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import {
  Comment,
  Delete,
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
import YoutubeCard from '../../../components/organisms/YoutubeCard'

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
    isReady,
  } = useRouter()

  const { data, loading } = usePlaylistQuery({
    variables: { id: parseInt(id?.toString()) },
    skip: !isReady,
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
              <Grid item sm={12} xs={12}>
                <PlayCircleOutline style={{ fontSize: 40 }} />
                <Shuffle style={{ fontSize: 40 }} />
                <ShareRounded style={{ fontSize: 40 }} />
                <RepeatRounded style={{ fontSize: 40 }} />
              </Grid>

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
                <Grid item sm={12} xs={12}>
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
              </Grid>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Grid container spacing={5}>
              <Grid
                item
                md={4}
                sm={12}
                style={{ borderRight: 'solid 1px #AAA' }}
              >
                <Box mb={2}>
                  <Typography variant="h6">再生設定</Typography>
                </Box>

                <Box mb={2}>
                  <TextField
                    className={classes.form}
                    InputProps={{
                      classes: {
                        input: classes.formInput,
                      },
                    }}
                    label="デフォルトのBPM"
                  />
                </Box>

                <TextField
                  className={classes.form}
                  InputProps={{
                    classes: {
                      input: classes.formInput,
                    },
                  }}
                  label="BPM変化量の許容値"
                />
              </Grid>
              <Grid item md={8} sm={12}>
                <Typography variant="h6">動画一覧</Typography>
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
                <Box mt={3}>
                  {data &&
                    data.playlist.videos.edges.map((edge) => (
                      <Box m={1}>
                        <YoutubeCard
                          youtubeVideoId={edge.node.youtubeVideoId}
                        />
                      </Box>
                    ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default EditPage
