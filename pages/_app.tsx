import React from 'react'
import { Provider } from 'react-redux'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Layout } from 'features'
import { store } from 'store'

import 'styles/globals.scss'

const MyApp: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Integral Multi Vendor</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default MyApp
