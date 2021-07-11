import { createContext } from 'react'
import { AppContext as AppContextInterface } from './interfaces/contexts'

export const initialState = {
  key: '',
  playlistId: undefined,
  defaultBpm: undefined,
  title: '',
  videos: [],
  youtubeUrl: '',
  playbackRate: 1,
  playingVideoId: undefined,
  youtubeVideoUrls: [],
  maxPlaybackRate: '',
  minPlaybackRate: '',
}

export const AppContext = createContext<AppContextInterface>({
  state: initialState,
  dispatch: () => {},
})
