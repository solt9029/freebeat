import { debounce, makeStyles, TextField } from '@material-ui/core'
import React, { useCallback, useContext, useState } from 'react'
import {
  usePlaylistQuery,
  useUpdatePlaylistTitleMutation,
} from '../../graphql/generated/graphql-client'
import { AppContext } from '../../pages/_app'

const useStyles = makeStyles(() => ({
  input: {
    fontSize: '1.5rem',
  },
}))

function PlaylistTitleField() {
  const classes = useStyles()

  const { state } = useContext(AppContext)

  const [title, setTitle] = useState('')

  usePlaylistQuery({
    variables: { id: state.playlistId },
    onCompleted: (data) => {
      setTitle(data.playlist.title)
    },
    skip: state.playlistId === undefined,
  })

  const [updatePlaylistTitle] = useUpdatePlaylistTitleMutation({
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updateTitle = useCallback(
    debounce((value: string) => {
      updatePlaylistTitle({
        variables: {
          id: state.playlistId,
          key: state.key,
          title: value,
        },
      })
    }, 1000),
    [updatePlaylistTitle, state],
  )

  const handleChange = useCallback(
    (event) => {
      setTitle(event.target.value)
      updateTitle(event.target.value)
    },
    [setTitle, updateTitle],
  )

  return (
    <TextField
      onChange={handleChange}
      fullWidth
      value={title}
      InputProps={{
        classes: {
          input: classes.input,
        },
      }}
      label="タイトル"
    />
  )
}

export default PlaylistTitleField
