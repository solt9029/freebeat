import Link from 'next/link'
import React from 'react'
import TopButton from '../atoms/TopButton'
import NewPlaylistButton from './NewPlaylistButton'

function TopLinkButtonList() {
  return (
    <>
      <NewPlaylistButton />
      <Link href="/playlists">
        <TopButton variant="outlined" color="secondary" size="large">
          プレイリストを探す
        </TopButton>
      </Link>
    </>
  )
}

export default TopLinkButtonList
