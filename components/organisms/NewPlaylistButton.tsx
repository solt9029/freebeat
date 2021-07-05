import React, { useCallback } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useCreatePlaylistMutation } from '../../graphql/generated/graphql-client'
import { addPlaylistKey } from '../../local-storage'
import TopButton from '../atoms/TopButton'

function NewPlaylistButton() {
  const router = useRouter()

  const [createPlaylist] = useCreatePlaylistMutation({
    onCompleted: (data) => {
      addPlaylistKey(
        data.createPlaylist.playlist.id,
        data.createPlaylist.playlist.key,
      )
      router.push(`/playlists/${data.createPlaylist.playlist.id}/edit`)
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
