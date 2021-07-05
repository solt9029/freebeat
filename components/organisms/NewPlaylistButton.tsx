import React, { useCallback } from 'react'
import { useCreatePlaylistMutation } from '../../graphql/generated/graphql-client'
import TopButton from '../atoms/TopButton'

function NewPlaylistButton() {
  const [createPlaylist] = useCreatePlaylistMutation({
    onCompleted: (data) => {
      console.log(data.createPlaylist.playlist.id)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleClick = useCallback(() => {
    createPlaylist()
  }, [createPlaylist])

  return (
    <TopButton
      variant="contained"
      color="secondary"
      size="large"
      onClick={handleClick}
    >
      プレイリストを作る
    </TopButton>
  )
}

export default NewPlaylistButton
