import { gql } from 'graphql-tag'

export const PLAYLIST_DEFAULT_BPM_QUERY = gql`
  query playlist($id: Int!) {
    playlist(id: $id) {
      id
      defaultBpm
    }
  }
`

export const PLAYLIST_TITLE_QUERY = gql`
  query playlist($id: Int!) {
    playlist(id: $id) {
      id
      title
    }
  }
`

export const VIDEO_BPM_QUERY = gql`
  query video($id: Int!) {
    video(id: $id) {
      id
      bpm
    }
  }
`
