import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import 'styles/index.css'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_XSTATE_DEVTOOLS === 'true') {
  ;(async () => {
    const inspect = (await import('@xstate/inspect')).inspect
    inspect({ iframe: false })
  })()
}

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
