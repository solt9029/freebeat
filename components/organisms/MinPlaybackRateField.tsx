import { debounce, TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import { useUpdatePlaylistMinPlaybackRateMutation } from '../../graphql/generated/graphql-client'
import { AppContext } from '../../contexts'

function MinPlaybackRateField() {
  const { state, dispatch } = useContext(AppContext)

  const [updatePlaylistMinPlaybackRate] =
    useUpdatePlaylistMinPlaybackRateMutation({
      onCompleted: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
      },
    })

  const updateMinPlaybackRate = useCallback(
    debounce((value: number) => {
      updatePlaylistMinPlaybackRate({
        variables: {
          id: state.playlistId,
          key: state.key,
          minPlaybackRate: value,
        },
      })
    }, 1000),
    [updatePlaylistMinPlaybackRate, state.key, state.playlistId],
  )

  const handleChange = useCallback(
    (event) => {
      dispatch({
        type: 'SET_MIN_PLAYBACK_RATE',
        payload: event.target.value,
      })
      updateMinPlaybackRate(parseFloat(event.target.value))
    },
    [dispatch, updateMinPlaybackRate],
  )

  return (
    <>
      <TextField
        fullWidth
        label="自動調整時の最小倍速（小数可）"
        value={state.minPlaybackRate?.toString() || ''}
        onChange={handleChange}
      />
    </>
  )
}

export default MinPlaybackRateField
