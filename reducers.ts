import arrayShuffle from 'array-shuffle'
import { AppAction } from './interfaces/actions'
import { AppState } from './interfaces/state'

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_KEY':
      return { ...state, key: action.payload }
    case 'SET_PLAYLIST_ID':
      return { ...state, playlistId: action.payload }
    case 'SET_DEFAULT_BPM':
      return { ...state, defaultBpm: action.payload }
    case 'SET_VIDEOS': {
      const youtubeVideoUrls = arrayShuffle(
        action.payload.map(
          (video) => `https://www.youtube.com/watch?v=${video.youtubeVideoId}`,
        ),
      )
      return { ...state, videos: action.payload, youtubeVideoUrls }
    }
    case 'UPDATE_VIDEO_BPM': {
      const videos = state.videos.map((video) => {
        if (video.id === action.payload.id) {
          video.bpm = action.payload.bpm
        }
        return video
      })
      console.log({ ...state, videos: videos })
      return { ...state, videos: videos }
    }
    case 'REFRESH_STATE': {
      const youtubeVideoUrls =
        state.videos.toString() === action.payload.videos.toString()
          ? state.youtubeVideoUrls
          : arrayShuffle<string>(
              action.payload.videos.map(
                (video) =>
                  `https://www.youtube.com/watch?v=${video.youtubeVideoId}`,
              ),
            )

      return {
        ...state,
        ...action.payload,
        youtubeUrl: '',
        playbackRate: 1,
        youtubeVideoUrls,
      }
    }
    case 'SET_TITLE':
      return { ...state, title: action.payload }
    case 'SET_YOUTUBE_URL':
      return { ...state, youtubeUrl: action.payload }
    case 'SET_PLAYBACK_RATE': {
      let playbackRate = action.payload
      if (playbackRate > state.maxPlaybackRate) {
        playbackRate = state.maxPlaybackRate
      } else if (playbackRate < state.minPlaybackRate) {
        playbackRate = state.minPlaybackRate
      }
      return { ...state, playbackRate }
    }
    case 'SET_PLAYING_VIDEO_ID':
      return { ...state, playingVideoId: action.payload }
    case 'SET_MIN_PLAYBACK_RATE': {
      const playbackRate =
        state.playbackRate < action.payload
          ? action.payload
          : state.playbackRate
      return { ...state, minPlaybackRate: action.payload, playbackRate }
    }
    case 'SET_MAX_PLAYBACK_RATE': {
      const playbackRate =
        state.playbackRate > action.payload
          ? action.payload
          : state.playbackRate
      return { ...state, maxPlaybackRate: action.payload, playbackRate }
    }
    default:
      return state
  }
}
