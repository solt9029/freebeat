import {
  Box,
  Container,
  Grid,
  makeStyles,
  Select,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect } from 'react'
import { CSSProperties } from '@material-ui/styles'
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

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    zIndex: 0,
    '&::before': {
      background: 'inherit',
      content: '""',
      filter: 'blur(3px)',
      backgroundColor: 'white',
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      right: '0px',
      left: '0px',
      zIndex: -1,
    },
  },
}))

const EditPage = () => {
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()

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

  let style: CSSProperties = {}
  if (state.videos.length > 0) {
    style = {
      backgroundImage: `linear-gradient(to bottom, rgba(230, 230, 230, 0.85), rgba(230, 230, 230, 0.2)), url(https://i.ytimg.com/vi/${state.videos[0].youtubeVideoId}/mqdefault.jpg)`,
      backgroundSize: '100% auto',
      backgroundRepeat: 'no-repeat',
    }
  }

  return (
    <Box py={5} className={classes.container} style={style}>
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
                <MaxPlaybackRateField />
              </Box>

              <Box mb={2}>
                <MinPlaybackRateField />
              </Box>

              <Box mb={2}>
                <small style={{ color: 'rgba(0, 0, 0, 0.54)' }}>再生順</small>
                <Select native fullWidth label="再生順">
                  <option>シャッフル</option>
                  {/* <option>上から順</option>
                  <option>BPMの昇順</option>
                  <option>BPMの降順</option> */}
                </Select>
              </Box>
            </Grid>
            <Grid item sm={8} xs={12} zeroMinWidth>
              <Typography variant="h6">動画一覧</Typography>
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
