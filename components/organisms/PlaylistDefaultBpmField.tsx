import { debounce, TextField } from '@material-ui/core'
import React, { useCallback, useContext, useState } from 'react'
import {
  usePlaylistQuery,
  useUpdatePlaylistMutation,
} from '../../graphql/generated/graphql-client'
import { AppContext } from '../../pages/_app'

function PlaylistDefaultBpmField() {
  const { state } = useContext(AppContext)

  const [defaultBpm, setDefaultBpm] = useState<number | undefined>(undefined)

  usePlaylistQuery({
    variables: { id: state.playlistId },
    onCompleted: (data) => {
      setDefaultBpm(data.playlist.defaultBpm)
    },
    skip: state.playlistId === undefined,
  })

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
      setDefaultBpm(event.target.value)
      updateDefaultBpm(parseInt(event.target.value))
    },
    [setDefaultBpm, updateDefaultBpm],
  )

  return (
    <TextField
      type="number"
      onChange={handleChange}
      fullWidth
      value={defaultBpm || ''}
      label="デフォルトのBPM"
    />
  )
}

export default PlaylistDefaultBpmField
