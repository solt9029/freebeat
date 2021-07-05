import React, { useCallback } from 'react'
import Lockr from 'lockr'
import { useCreatePlaylistMutation } from '../../graphql/generated/graphql-client'
import { addPlaylistKey } from '../../local-storage'
import TopButton from '../atoms/TopButton'

function NewPlaylistButton() {
  const [createPlaylist] = useCreatePlaylistMutation({
    onCompleted: (data) => {
      console.log(data.createPlaylist.playlist.id)
      addPlaylistKey(
        data.createPlaylist.playlist.id,
        data.createPlaylist.playlist.key,
      )
      console.log(Lockr.get('keys'))
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
