import { debounce, TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import { useUpdatePlaylistMutation } from '../../graphql/generated/graphql-client'
import { AppContext } from '../../pages/_app'

function PlaylistDefaultBpmField() {
  const { state, dispatch } = useContext(AppContext)

  const [updatePlaylist] = useUpdatePlaylistMutation({
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updateDefaultBpm = useCallback(
    debounce((value: number) => {
      updatePlaylist({
        variables: {
          id: state.playlistId,
          key: state.key,
          defaultBpm: value,
        },
      })
    }, 1000),
    [updatePlaylist, state],
  )

  const handleChange = useCallback(
    (event) => {
      dispatch({ type: 'SET_DEFAULT_BPM', payload: event.target.value })
      updateDefaultBpm(parseInt(event.target.value))
    },
    [dispatch, updateDefaultBpm],
  )

  return (
    <>
      <TextField
        type="number"
        onChange={handleChange}
        fullWidth
        value={state.defaultBpm || ''}
        label="デフォルトのBPM"
      />
      <small style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
        デフォルトのBPMになるように自動的に倍速調整して動画を再生します
      </small>
    </>
  )
}

export default PlaylistDefaultBpmField
