import React from 'react'
import TopButton from '../atoms/TopButton'
import NewPlaylistButton from './NewPlaylistButton'

function TopLinkButtonList() {
  return (
    <>
      <NewPlaylistButton />
      <TopButton variant="outlined" color="secondary" size="large">
        プレイリストを探す
      </TopButton>
    </>
  )
}

export default TopLinkButtonList
