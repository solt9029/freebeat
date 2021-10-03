import { debounce, TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import { useUpdatePlaylistMaxPlaybackRateMutation } from '../../graphql/generated/graphql-client'
import { AppContext } from '../../contexts'
import { writePlaylistMaxPlaybackRateQuery } from '../../apollo-client'

function MaxPlaybackRateField() {
  const { state, dispatch } = useContext(AppContext)

  const [updatePlaylistMaxPlaybackRate] =
    useUpdatePlaylistMaxPlaybackRateMutation({
      onCompleted: (data) => {
        console.log(data)
      },
      onError: (error) => {
        dispatch({
          type: 'SET_SNACKBAR',
          payload: {
            text: '自動調整時の最大倍速の更新に失敗しました',
            color: 'error',
          },
        })
        console.log(error)
      },
    })

  const updateMaxPlaybackRate = useCallback(
    debounce((value: number) => {
      updatePlaylistMaxPlaybackRate({
        variables: {
          id: state.playlistId,
          key: state.key,
          maxPlaybackRate: value,
        },
      })
    }, 1000),
    [updatePlaylistMaxPlaybackRate, state.key, state.playlistId],
  )

  const handleChange = useCallback(
    (event) => {
      // TODO: update playback rate here
      writePlaylistMaxPlaybackRateQuery(state.playlistId, event.target.value)
      updateMaxPlaybackRate(parseFloat(event.target.value))
    },
    [dispatch, updateMaxPlaybackRate],
  )

  return (
    <>
      <TextField
        fullWidth
        label="自動調整時の最大倍速（小数可）"
        value={state.maxPlaybackRate?.toString() || ''}
        onChange={handleChange}
      />
    </>
  )
}

export default MaxPlaybackRateField
