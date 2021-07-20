import { debounce, makeStyles, TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import { useUpdatePlaylistTitleMutation } from '../../graphql/generated/graphql-client'
import { AppContext } from '../../contexts'

const useStyles = makeStyles(() => ({
  input: {
    fontSize: '1.5rem',
  },
}))

function PlaylistTitleField() {
  const classes = useStyles()

  const { state, dispatch } = useContext(AppContext)

  const [updatePlaylistTitle] = useUpdatePlaylistTitleMutation({
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => {
      dispatch({
        type: 'SET_SNACKBAR',
        payload: { text: 'タイトルの更新に失敗しました', color: 'error' },
      })
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
    [updatePlaylistTitle, state.key, state.playlistId],
  )

  const handleChange = useCallback(
    (event) => {
      dispatch({ type: 'SET_TITLE', payload: event.target.value || '' })
      updateTitle(event.target.value || '')
    },
    [dispatch, updateTitle],
  )

  return (
    <TextField
      onChange={handleChange}
      fullWidth
      value={state.title}
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
