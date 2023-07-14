/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/lib/apolloClient'
import { Header } from '@/components'
import { GlobalProvider } from '@/context'


export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalProvider>
        <Header />
        <Component {...pageProps} />
      </GlobalProvider>
      <Toaster
        toastOptions={{
          style: {
            zIndex: 99999,
          }
        }}
      />
    </ApolloProvider>
  )
}
