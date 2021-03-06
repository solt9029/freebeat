import {
  Box,
  Button,
  Container,
  Grid,
  Select,
  Snackbar,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect } from 'react'
import { Alert, Color } from '@material-ui/lab'
import { Info, Twitter } from '@material-ui/icons'
import { usePlaylistQuery } from '../../../graphql/generated/graphql-client'
import VideoCard from '../../../components/organisms/VideoCard'
import { getPlaylistKey } from '../../../local-storage'
import { AppContext } from '../../../contexts'
import PlaylistTitleField from '../../../components/organisms/PlaylistTitleField'
import PlaylistKeyField from '../../../components/organisms/PlaylistKeyField'
import NewVideoForm from '../../../components/organisms/NewVideoForm'
import PlaylistDefaultBpmField from '../../../components/organisms/PlaylistDefaultBpmField'
import YoutubePlayer from '../../../components/organisms/YoutubePlayer'
import MaxPlaybackRateField from '../../../components/organisms/MaxPlaybackRateField'
import MinPlaybackRateField from '../../../components/organisms/MinPlaybackRateField'

const EditPage = () => {
  const { state, dispatch } = useContext(AppContext)

  const {
    query: { id },
  } = useRouter()

  const { data } = usePlaylistQuery({
    variables: { id: state.playlistId },
    onCompleted: () => {},
    skip: state.playlistId === undefined,
  })

  useEffect(() => {
    if (data?.playlist === undefined) {
      return
    }

    console.log('refresh' + data.playlist.defaultBpm)
    dispatch({
      type: 'REFRESH_STATE',
      payload: {
        defaultBpm: data.playlist.defaultBpm,
        title: data.playlist.title,
        maxPlaybackRate: data.playlist.maxPlaybackRate?.toString(),
        minPlaybackRate: data.playlist.minPlaybackRate?.toString(),
        videos: data.playlist.videos.edges.map((edge) => ({
          id: parseInt(edge.node.id),
          bpm: edge.node.bpm,
          youtubeVideoId: edge.node.youtubeVideoId,
          youtubeVideoTitle: edge.node.youtubeVideoTitle,
        })),
      },
    })
  }, [data?.playlist, dispatch])

  useEffect(() => {
    if (id === undefined) {
      return
    }
    dispatch({
      type: 'SET_KEY',
      payload: getPlaylistKey(id.toString()) || '',
    })
    dispatch({ type: 'SET_PLAYLIST_ID', payload: parseInt(id.toString()) })
  }, [id, dispatch])

  return (
    <Box py={5}>
      <Snackbar
        open={state.snackbar !== undefined}
        autoHideDuration={3000}
        onClose={() => {
          dispatch({ type: 'SET_SNACKBAR', payload: undefined })
        }}
      >
        <Alert
          variant="filled"
          onClose={() => {
            dispatch({ type: 'SET_SNACKBAR', payload: undefined })
          }}
          severity={state.snackbar?.color as Color}
        >
          {state.snackbar?.text}
        </Alert>
      </Snackbar>
      <Container>
        <Grid spacing={3} container>
          <Grid item xs={12} sm={6} md={4}>
            <YoutubePlayer />
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
              <Grid item sm={12} xs={12}>
                <Button
                  onClick={() => {
                    const url = `${window.location.protocol}//${window.location.host}/playlists/${state.playlistId}/edit`
                    const newWindow = window.open(
                      '',
                      'child',
                      'width=600, height=300',
                    )
                    newWindow.location.href = `https://twitter.com/share?text=${state.title}(BPM${state.defaultBpm})&hashtags=FreeBeat&url=${url}&count=none&lang=ja`
                  }}
                >
                  <Twitter /> ??????????????????
                </Button>
                <a
                  href="/help"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Button style={{ paddingLeft: '1rem' }}>
                    <Info /> ??????????????????
                  </Button>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Grid container spacing={5}>
            <Grid item sm={4} xs={12} zeroMinWidth>
              <Box mb={2}>
                <Typography variant="h6">????????????</Typography>
              </Box>

              <Box mb={2}>
                <PlaylistDefaultBpmField />
              </Box>

              <Box mb={2}>
                <MaxPlaybackRateField />
              </Box>

              <Box mb={2}>
                <MinPlaybackRateField />
              </Box>

              <Box mb={2}>
                <small style={{ color: 'rgba(0, 0, 0, 0.54)' }}>?????????</small>
                <Select native fullWidth label="?????????">
                  <option>???????????????</option>
                  {/* <option>????????????</option>
                  <option>BPM?????????</option>
                  <option>BPM?????????</option> */}
                </Select>
              </Box>
            </Grid>
            <Grid item sm={8} xs={12} zeroMinWidth>
              <Typography variant="h6">????????????</Typography>
              <NewVideoForm />

              <Box mt={3}>
                {data &&
                  state.videos.map((video, index) => (
                    <Box m={1} key={index}>
                      <VideoCard
                        bpm={video.bpm}
                        id={video.id}
                        youtubeVideoId={video.youtubeVideoId}
                        youtubeVideoTitle={video.youtubeVideoTitle}
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
