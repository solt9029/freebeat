import { Button, Grid, TextField } from '@material-ui/core'
import React, { useCallback, useContext, useState } from 'react'
import { AppContext } from '../../pages/_app'
import {
  PlaylistDocument,
  useCreateVideoMutation,
  useCreateVideosMutation,
} from '../../graphql/generated/graphql-client'

function AddVideoForm() {
  const { state } = useContext(AppContext)

  const [youtubeUrl, setYoutubeUrl] = useState('')

  const [createVideo] = useCreateVideoMutation({
    onCompleted: () => {
      setYoutubeUrl('')
    },
    refetchQueries: [
      { query: PlaylistDocument, variables: { id: state.playlistId } },
    ],
    onError: (error) => {},
  })

  const [createVideos] = useCreateVideosMutation({
    onCompleted: () => {
      setYoutubeUrl('')
    },
    refetchQueries: [
      { query: PlaylistDocument, variables: { id: state.playlistId } },
    ],
    onError: (error) => {},
  })

  const handleChange = useCallback(
    (event) => {
      setYoutubeUrl(event.target.value)
    },
    [setYoutubeUrl],
  )

  const handleClick = useCallback(() => {
    var url = new URL(youtubeUrl)

    const youtubeVideoId = url.searchParams.get('v')
    if (youtubeVideoId) {
      createVideo({
        variables: {
          playlistId: state.playlistId,
          youtubeVideoId: youtubeVideoId,
          key: state.key,
        },
      })
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
  }, [youtubeUrl, state, createVideo, createVideos])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={9} md={10}>
        <TextField
          fullWidth
          label="YouTubeの動画またはプレイリストのURL"
          onChange={handleChange}
          value={youtubeUrl}
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

export default AddVideoForm
