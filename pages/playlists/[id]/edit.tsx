import {
  Box,
  Container,
  Grid,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect } from 'react'
import { usePlaylistQuery } from '../../../graphql/generated/graphql-client'
import YoutubeVideoCard from '../../../components/organisms/YoutubeVideoCard'
import { getPlaylistKey } from '../../../local-storage'
import { AppContext } from '../../_app'
import PlaylistTitleField from '../../../components/organisms/PlaylistTitleField'
import PlaylistKeyField from '../../../components/organisms/PlaylistKeyField'
import NewVideoForm from '../../../components/organisms/NewVideoForm'
import PlaylistDefaultBpmField from '../../../components/organisms/PlaylistDefaultBpmField'
import YoutubePlayer from '../../../components/organisms/YoutubePlayer'

const EditPage = () => {
  const { state, dispatch } = useContext(AppContext)

  const {
    query: { id },
    isReady,
  } = useRouter()

  const { data } = usePlaylistQuery({
    variables: { id: state.playlistId },
    onCompleted: () => {},
    skip: state.playlistId === undefined,
  })

  useEffect(() => {
    if (isReady && id) {
      dispatch({
        type: 'SET_KEY',
        payload: getPlaylistKey(id.toString()) || '',
      })
      dispatch({ type: 'SET_PLAYLIST_ID', payload: parseInt(id.toString()) })
    }
  }, [id, isReady, dispatch])

  useEffect(() => {
    dispatch({
      type: 'SET_VIDEOS',
      payload: data.playlist.videos.edges.map((edge) => ({
        id: parseInt(edge.node.id),
        bpm: edge.node.bpm,
        youtubeVideoId: edge.node.youtubeVideoId,
      })),
    })
  }, [data?.playlist?.videos, dispatch])

  useEffect(() => {
    dispatch({ type: 'SET_DEFAULT_BPM', payload: data.playlist.defaultBpm })
  }, [data?.playlist?.defaultBpm, dispatch])

  return (
    <Box py={5}>
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
                <TextField fullWidth label="BPM変化量の許容値" />
              </Box>

              <Box mb={2}>
                <small style={{ color: 'rgba(0, 0, 0, 0.54)' }}>再生順</small>
                <Select native fullWidth label="再生順">
                  <option>シャッフル</option>
                  <option>上から順</option>
                  <option>BPMの昇順</option>
                  <option>BPMの降順</option>
                </Select>
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
                        bpm={edge.node.bpm}
                        id={parseInt(edge.node.id)}
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
