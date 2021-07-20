import { AppState, Snackbar, Video } from './state'

export type AppAction =
  | {
      type: 'SET_KEY'
      payload: string
    }
  | {
      type: 'SET_PLAYLIST_ID'
      payload: number | undefined
    }
  | {
      type: 'SET_DEFAULT_BPM'
      payload: number | undefined
    }
  | {
      type: 'SET_VIDEOS'
      payload: Video[]
    }
  | {
      type: 'UPDATE_VIDEO_BPM'
      payload: Pick<Video, 'id' | 'bpm'>
    }
  | {
      type: 'REFRESH_STATE'
      payload: Pick<
        AppState,
        | 'defaultBpm'
        | 'title'
        | 'videos'
        | 'maxPlaybackRate'
        | 'minPlaybackRate'
      >
    }
  | {
      type: 'SET_TITLE'
      payload: string
    }
  | {
      type: 'SET_YOUTUBE_URL'
      payload: string
    }
  | {
      type: 'SET_PLAYING_VIDEO_ID'
      payload?: number
    }
  | {
      type: 'SET_MAX_PLAYBACK_RATE'
      payload?: string
    }
  | {
      type: 'SET_MIN_PLAYBACK_RATE'
      payload?: string
    }
  | {
      type: 'SET_SNACKBAR'
      payload?: Snackbar
    }
