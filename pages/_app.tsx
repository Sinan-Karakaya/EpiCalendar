import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { NextUIProvider, createTheme } from '@nextui-org/react'

export default function App({ Component, pageProps }: AppProps) {
  const darkMode = createTheme({
    type: 'dark'
  })

  return (
    <NextUIProvider theme={darkMode}>
     <Component {...pageProps} />
    </NextUIProvider>
  )
}
