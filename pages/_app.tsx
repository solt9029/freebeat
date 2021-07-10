import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import Head from 'next/head'
import { createContext, Dispatch, useEffect, useReducer } from 'react'
import apolloClient from '../apollo-client'
import Navbar from '../components/organisms/Navbar'
import theme from '../theme'

type Video = {
  id: number
  youtubeVideoId: string
  bpm: number
}

type AppAction =
  | {
      type: 'SET_KEY'
      payload: string
    }
  | {
      type: 'SET_PLAYLIST_ID'
      payload: number
    }
  | {
      type: 'SET_DEFAULT_BPM'
      payload: number
    }
  | {
      type: 'SET_VIDEOS'
      payload: Video[]
    }
  | {
      type: 'UPDATE_VIDEO_BPM'
      payload: Pick<Video, 'id' | 'bpm'>
    }

type AppContextInterface = {
  state: AppStateInterface
  dispatch: Dispatch<AppAction>
}

type AppStateInterface = {
  playlistId?: number
  key: string
  defaultBpm?: number
  videos: Video[]
}

const initialState = {
  key: '',
  playlistId: undefined,
  defaultBpm: undefined,
  videos: [],
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
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload }
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
