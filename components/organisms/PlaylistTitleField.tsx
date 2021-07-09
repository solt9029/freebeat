import { debounce, makeStyles, TextField } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useState } from 'react'
import { usePlaylistQuery } from '../../graphql/generated/graphql-client'

const useStyles = makeStyles(() => ({
  input: {
    fontSize: '1.5rem',
  },
}))

function PlaylistTitleField() {
  const classes = useStyles()

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

  const updateTitle = useCallback(
    debounce((title: string) => {
      // update title
      console.log(title)
    }, 1000),
    [],
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
