import { Button, Grid, TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import { AppContext } from '../../contexts'
import {
  PlaylistDocument,
  useCreateVideoMutation,
  useCreateVideosMutation,
} from '../../graphql/generated/graphql-client'

function NewVideoForm() {
  const { state, dispatch } = useContext(AppContext)

  const [createVideo] = useCreateVideoMutation({
    onCompleted: () => {
      dispatch({ type: 'SET_YOUTUBE_URL', payload: '' })
    },
    refetchQueries: [
      { query: PlaylistDocument, variables: { id: state.playlistId } },
    ],
    onError: (error) => {
      dispatch({
        type: 'SET_SNACKBAR',
        payload: {
          text: 'YouTube動画の追加に失敗しました',
          color: 'error',
        },
      })
      console.log(error)
    },
  })

  const [createVideos] = useCreateVideosMutation({
    onCompleted: () => {
      dispatch({ type: 'SET_YOUTUBE_URL', payload: '' })
    },
    refetchQueries: [
      { query: PlaylistDocument, variables: { id: state.playlistId } },
    ],
    onError: (error) => {
      dispatch({
        type: 'SET_SNACKBAR',
        payload: {
          text: 'YouTubeプレイリストの追加に失敗しました',
          color: 'error',
        },
      })
      console.log(error)
    },
  })

  const handleChange = useCallback(
    (event) => {
      dispatch({ type: 'SET_YOUTUBE_URL', payload: event.target.value || '' })
    },
    [dispatch],
  )

  const handleClick = useCallback(() => {
    var url = new URL(state.youtubeUrl)

    const youtubeVideoId = url.searchParams.get('v')
    if (youtubeVideoId) {
      createVideo({
        variables: {
          playlistId: state.playlistId,
          youtubeVideoId: youtubeVideoId,
          key: state.key,
        },
      })
      return
    }

    const youtubePlaylistId = url.searchParams.get('list')
    if (youtubePlaylistId) {
      createVideos({
        variables: {
          playlistId: state.playlistId,
          youtubePlaylistId: youtubePlaylistId,
          key: state.key,
        },
      })
    }
  }, [state, createVideo, createVideos])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={9} md={10}>
        <TextField
          fullWidth
          label="YouTubeの動画またはプレイリストのURL"
          onChange={handleChange}
          value={state.youtubeUrl}
        />
        <small style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
          1つのプレイリストに50個までの動画を追加することができます。
        </small>
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleClick}
        >
          追加
        </Button>
      </Grid>
    </Grid>
  )
}

export default NewVideoForm
