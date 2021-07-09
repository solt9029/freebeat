import { debounce, makeStyles, TextField } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useContext, useState } from 'react'
import {
  usePlaylistQuery,
  useUpdatePlaylistMutation,
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

  const {
    query: { id },
    isReady,
  } = useRouter()

  usePlaylistQuery({
    variables: { id: parseInt(id?.toString()) },
    onCompleted: (data) => {
      setTitle(data.playlist.title)
    },
    skip: !isReady,
  })

  const [updatePlaylist] = useUpdatePlaylistMutation({
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updateTitle = useCallback(
    debounce((value: string) => {
      updatePlaylist({
        variables: {
          id: parseInt(id?.toString()),
          key: state.key,
          title: value,
        },
      })
    }, 1000),
    [id, updatePlaylist, state],
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
