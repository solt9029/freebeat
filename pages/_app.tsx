import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import Head from 'next/head'
import { useEffect, useReducer } from 'react'
import apolloClient from '../apollo-client'
import Navbar from '../components/organisms/Navbar'
import theme from '../theme'
import { appReducer } from '../reducers'
import { AppContext, initialState } from '../contexts'
import Footer from '../components/organisms/Footer'

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
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="FreeBeat" />
        <meta
          name="twitter:description"
          content="YouTube動画でプレイリストを作り、好きなBPMに合わせた倍速再生ができる、作業用音楽プレイヤーです。"
        />
        <meta name="twitter:url" content="http://freebeat.vercel.app" />
        <meta name="twitter:site" content="@solt9029" />
        <meta name="twitter:creator" content="@solt9029" />
        <meta
          name="twitter:image"
          content="https://freebeat.vercel.app/icon.png"
        ></meta>
        <title>FreeBeat</title>
        <link rel="icon" href="/icon.png" type="image/png"></link>
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
              <Footer />
            </ThemeProvider>
          </StylesProvider>
        </AppContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App
