"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../style/globals.css'
import { GlobalContextProvider } from '@/context/context'
import { withUrqlClient } from 'next-urql'
import { SERVER_URL } from '@/lib/urql'
import { cacheExchange, fetchExchange } from 'urql'

const inter = Inter({ subsets: ['latin'] })
 function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>SHE FEST</title>
        <meta name="description" content="A site for my programming portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>

      <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  )
}

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [fetchExchange, cacheExchange],
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(RootLayout);