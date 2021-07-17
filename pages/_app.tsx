import React from 'react'
import Head from 'next/head'
import { AppContext, AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {theme} from '../themeProvider'
import { wrapper, useStore } from '../redux/store'
import { LayoutSwitch } from '@/components/LayoutSwitch'
import '../css/main.css'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <React.Fragment>
          <Head>
            <title>My page</title>
            <meta
              name='viewport'
              content='minimum-scale=1, initial-scale=1, width=device-width'
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <LayoutSwitch>
            <Component {...pageProps} />
            </LayoutSwitch>
          </ThemeProvider>
        </React.Fragment>
      </PersistGate>
    </Provider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {})
    }
  }
}

export default wrapper.withRedux(MyApp)
