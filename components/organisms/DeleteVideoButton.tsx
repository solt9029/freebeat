import { Button, makeStyles } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import React, { useCallback, useContext } from 'react'
import {
  PlaylistDocument,
  useDeleteVideoMutation,
} from '../../graphql/generated/graphql-client'
import { AppContext } from '../../contexts'

const useStyles = makeStyles(() => ({
  button: {
    justifyContent: 'flex-start',
  },
}))

type Props = {
  id: number
}

function DeleteVideoButton(props: Props) {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)

  const [deleteVideo] = useDeleteVideoMutation({
    onCompleted: (data) => {
      console.log(data)
    },
    refetchQueries: [
      { query: PlaylistDocument, variables: { id: state.playlistId } },
    ],
    onError: (error) => {
      dispatch({
        type: 'SET_SNACKBAR',
        payload: { text: '動画の削除に失敗しました', color: 'error' },
      })
      console.log(error)
    },
  })

  const handleClick = useCallback(() => {
    deleteVideo({
      variables: {
        id: props.id,
        key: state.key,
      },
    })
  }, [deleteVideo, props.id, state.key])

  return (
    <Button
      size="small"
      fullWidth
      className={classes.button}
      onClick={handleClick}
    >
      <DeleteOutlined />
      プレイリストから削除
    </Button>
  )
}

export default DeleteVideoButton
