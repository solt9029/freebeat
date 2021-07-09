import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import Head from 'next/head'
import { createContext, Dispatch, useEffect, useReducer } from 'react'
import apolloClient from '../apollo-client'
import Navbar from '../components/organisms/Navbar'
import theme from '../theme'

type AppAction = {
  type: 'SET_KEY'
  payload: string
}

type AppContextInterface = {
  state: AppStateInterface
  dispatch: Dispatch<AppAction>
}

type AppStateInterface = {
  key: string
}

const initialState = { key: '' }

export const AppContext = createContext<AppContextInterface>({
  state: initialState,
  dispatch: () => {},
})

const appReducer = (state: AppStateInterface, action: AppAction) => {
  switch (action.type) {
    case 'SET_KEY':
      return { ...state, key: action.payload }
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
