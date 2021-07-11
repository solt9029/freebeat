import arrayShuffle from 'array-shuffle'
import { AppAction } from './interfaces/actions'
import { AppState, Video } from './interfaces/state'

const calcPlaybackRate = (
  videos: Video[],
  playingVideoId?: number,
  defaultBpm?: number,
  maxPlaybackRate?: number,
  minPlaybackRate?: number,
) => {
  const bpm = videos.find((video) => video.id === playingVideoId)?.bpm

  if (bpm && defaultBpm) {
    let playbackRate = defaultBpm / bpm
    if (playbackRate > maxPlaybackRate) {
      playbackRate = maxPlaybackRate
    } else if (playbackRate < minPlaybackRate) {
      playbackRate = minPlaybackRate
    }
    return playbackRate
  }

  return 1
}

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_KEY':
      return { ...state, key: action.payload }

    case 'SET_PLAYLIST_ID':
      return { ...state, playlistId: action.payload }

    case 'SET_DEFAULT_BPM': {
      const playbackRate = calcPlaybackRate(
        state.videos,
        state.playingVideoId,
        action.payload,
        state.maxPlaybackRate,
        state.minPlaybackRate,
      )
      return { ...state, defaultBpm: action.payload, playbackRate }
    }

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

    case 'SET_PLAYING_VIDEO_ID': {
      const playbackRate = calcPlaybackRate(
        state.videos,
        action.payload,
        state.defaultBpm,
        state.maxPlaybackRate,
        state.minPlaybackRate,
      )
      return { ...state, playingVideoId: action.payload, playbackRate }
    }

    case 'SET_MAX_PLAYBACK_RATE': {
      const playbackRate = calcPlaybackRate(
        state.videos,
        state.playingVideoId,
        state.defaultBpm,
        action.payload,
        state.minPlaybackRate,
      )
      return { ...state, maxPlaybackRate: action.payload, playbackRate }
    }

    case 'SET_MIN_PLAYBACK_RATE': {
      console.log('minmin' + action.payload)
      const playbackRate = calcPlaybackRate(
        state.videos,
        state.playingVideoId,
        state.defaultBpm,
        state.maxPlaybackRate,
        action.payload,
      )
      console.log(playbackRate)
      return { ...state, minPlaybackRate: action.payload, playbackRate }
    }

    default:
      return state
  }
}
