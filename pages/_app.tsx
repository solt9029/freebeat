import * as React from 'react'

function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default App
