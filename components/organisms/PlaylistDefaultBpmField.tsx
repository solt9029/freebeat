import { debounce, TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import { useUpdatePlaylistDefaultBpmMutation } from '../../graphql/generated/graphql-client'
import { AppContext } from '../../contexts'
import { writePlaylistDefaultBpmQuery } from '../../apollo-client'

function PlaylistDefaultBpmField() {
  const { state, dispatch } = useContext(AppContext)

  const [updatePlaylistDefaultBpm] = useUpdatePlaylistDefaultBpmMutation({
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => {
      dispatch({
        type: 'SET_SNACKBAR',
        payload: {
          text: 'デフォルトのBPMの更新に失敗しました',
          color: 'error',
        },
      })
      console.log(error)
    },
  })

  const updateDefaultBpm = useCallback(
    debounce((value: number) => {
      updatePlaylistDefaultBpm({
        variables: {
          id: state.playlistId,
          key: state.key,
          defaultBpm: value,
        },
      })
    }, 1000),
    [updatePlaylistDefaultBpm, state.key, state.playlistId],
  )

  const handleChange = useCallback(
    (event) => {
      writePlaylistDefaultBpmQuery(state.playlistId, event.target.value)
      updateDefaultBpm(parseInt(event.target.value))
    },
    [updateDefaultBpm, state.playlistId, writePlaylistDefaultBpmQuery],
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
