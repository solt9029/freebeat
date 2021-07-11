import { debounce, TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import { useUpdatePlaylistMaxPlaybackRateMutation } from '../../graphql/generated/graphql-client'
import { AppContext } from '../../contexts'

function MaxPlaybackRateField() {
  const { state, dispatch } = useContext(AppContext)

  const [updatePlaylistMaxPlaybackRate] =
    useUpdatePlaylistMaxPlaybackRateMutation({
      onCompleted: (data) => {
        console.log(data)
      },
      onError: (error) => {
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
      dispatch({
        type: 'SET_MAX_PLAYBACK_RATE',
        payload: event.target.value,
      })
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
