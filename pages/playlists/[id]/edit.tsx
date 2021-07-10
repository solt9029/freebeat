import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import YouTube from 'react-youtube'
import { useContext, useEffect } from 'react'
import { usePlaylistQuery } from '../../../graphql/generated/graphql-client'
import YoutubeVideoCard from '../../../components/organisms/YoutubeVideoCard'
import { getPlaylistKey } from '../../../local-storage'
import { AppContext } from '../../_app'
import PlaylistTitleField from '../../../components/organisms/PlaylistTitleField'
import PlaylistKeyField from '../../../components/organisms/PlaylistKeyField'
import NewVideoForm from '../../../components/organisms/NewVideoForm'
import PlaylistDefaultBpmField from '../../../components/organisms/PlaylistDefaultBpmField'

const useStyles = makeStyles(() => ({
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
  },
}))

const EditPage = () => {
  const classes = useStyles()

  const { state, dispatch } = useContext(AppContext)

  const {
    query: { id },
    isReady,
  } = useRouter()

  useEffect(() => {
    if (isReady && id) {
      dispatch({ type: 'SET_KEY', payload: getPlaylistKey(id.toString()) })
      dispatch({ type: 'SET_PLAYLIST_ID', payload: parseInt(id.toString()) })
    }
  }, [id, isReady])

  const { data } = usePlaylistQuery({
    variables: { id: state.playlistId },
    skip: state.playlistId === undefined,
  })

  return (
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
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Grid item sm={12} xs={12}></Grid>

            <Grid container spacing={2}>
              <Grid item lg={12} xs={12}>
                <PlaylistTitleField />
              </Grid>
              <Grid item sm={12} xs={12}>
                <PlaylistKeyField />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Grid container spacing={5}>
            <Grid item sm={4} xs={12} zeroMinWidth>
              <Box mb={2}>
                <Typography variant="h6">再生設定</Typography>
              </Box>

              <Box mb={2}>
                <PlaylistDefaultBpmField />
              </Box>

              <Box mb={2}>
                <small style={{ color: 'rgba(0, 0, 0, 0.54)' }}>再生順</small>
                <Select native fullWidth label="再生順">
                  <option>上から順に再生</option>
                  <option>BPMの昇順に再生</option>
                  <option>BPMの降順に再生</option>
                </Select>
              </Box>

              <Box mb={2}>
                <TextField
                  className={classes.form}
                  InputProps={{
                    classes: {
                      input: classes.formInput,
                    },
                  }}
                  label="BPM変化量の許容値"
                />
              </Box>

              <Box mb={2}>
                <FormControlLabel
                  style={{ marginLeft: 0 }}
                  control={<Switch color="secondary" />}
                  label="シャッフル再生"
                  labelPlacement="start"
                />
              </Box>
            </Grid>
            <Grid item sm={8} xs={12} zeroMinWidth>
              <Typography variant="h6">動画一覧</Typography>
              <NewVideoForm />

              <Box mt={3}>
                {data &&
                  data.playlist.videos.edges.map((edge, index) => (
                    <Box m={1} key={index}>
                      <YoutubeVideoCard
                        youtubeVideoId={edge.node.youtubeVideoId}
                        youtubeVideoTitle={edge.node.youtubeVideoTitle}
                      />
                    </Box>
                  ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default EditPage
