import { TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import { AppContext } from '../../pages/_app'

function PlaylistKeyField() {
  const { state, dispatch } = useContext(AppContext)

  const handleChange = useCallback(
    (event) => {
      dispatch({ type: 'SET_KEY', payload: event.target.value })
    },
    [dispatch],
  )

  return (
    <>
      <TextField
        onChange={handleChange}
        fullWidth
        value={state.key}
        label="編集キー"
      />
      <small>プレイリストを編集するために必要な暗号です。</small>
    </>
  )
}

export default PlaylistKeyField
