import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  field: {
    width: '100%',
  },
  input: {
    fontSize: '1.5rem',
  },
}))

function PlaylistTitleField() {
  const classes = useStyles()

  return (
    <TextField
      className={classes.field}
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
