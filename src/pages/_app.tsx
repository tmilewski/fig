import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import 'styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TW</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider defaultTheme="system" disableTransitionOnChange enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
