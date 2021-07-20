export type Video = {
  id: number
  youtubeVideoId: string
  youtubeVideoTitle: string
  bpm: number
}

export type Snackbar = {
  color: string
  text: string
}

export type AppState = {
  playlistId?: number
  key: string
  defaultBpm?: number
  title: string
  videos: Video[]
  youtubeUrl: string
  playbackRate: number
  playingVideoId?: number
  youtubeVideoUrls: string[]
  maxPlaybackRate?: string
  minPlaybackRate?: string
  snackbar: Snackbar
}
