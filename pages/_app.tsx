import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import arrayShuffle from 'array-shuffle'
import Head from 'next/head'
import { createContext, Dispatch, useEffect, useReducer } from 'react'
import apolloClient from '../apollo-client'
import Navbar from '../components/organisms/Navbar'
import theme from '../theme'

type Video = {
  id: number
  youtubeVideoId: string
  youtubeVideoTitle: string
  bpm: number
}

type AppAction =
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
      payload: Pick<AppStateInterface, 'defaultBpm' | 'title' | 'videos'>
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
      type: 'SET_PLAYBACK_RATE'
      payload: number
    }
  | {
      type: 'SET_PLAYING_VIDEO_ID'
      payload?: number
    }
  | {
      type: 'SET_MAX_PLAYBACK_RATE'
      payload: number
    }
  | {
      type: 'SET_MIN_PLAYBACK_RATE'
      payload: number
    }

type AppContextInterface = {
  state: AppStateInterface
  dispatch: Dispatch<AppAction>
}

type AppStateInterface = {
  playlistId?: number
  key: string
  defaultBpm?: number
  title: string
  videos: Video[]
  youtubeUrl: string
  playbackRate: number
  playingVideoId?: number
  youtubeVideoUrls: string[]
  maxPlaybackRate: number
  minPlaybackRate: number
}

const initialState = {
  key: '',
  playlistId: undefined,
  defaultBpm: undefined,
  title: '',
  videos: [],
  youtubeUrl: '',
  playbackRate: 1,
  playingVideoId: undefined,
  youtubeVideoUrls: [],
  maxPlaybackRate: 1.5,
  minPlaybackRate: 0.75,
}

export const AppContext = createContext<AppContextInterface>({
  state: initialState,
  dispatch: () => {},
})

const appReducer = (
  state: AppStateInterface,
  action: AppAction,
): AppStateInterface => {
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
          : arrayShuffle(
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

function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const jssStyles: Element | null = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <ApolloProvider client={apolloClient}>
        <AppContext.Provider value={{ state, dispatch }}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Navbar />
              <Component {...pageProps} />
            </ThemeProvider>
          </StylesProvider>
        </AppContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App
