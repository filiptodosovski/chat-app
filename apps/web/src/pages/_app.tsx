import { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/global.css'
import { SessionProvider } from 'next-auth/react'
import { RootProvider } from '@/providers/RootProvider'
import { WebSocketProvider } from '@/providers'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <WebSocketProvider>
        <RootProvider session={session}>
          <>
            <Head>
              <title>Chat App</title>
            </Head>
            <div className="bg-bgPrimary min-h-screen">
              <main>
                <Component {...pageProps} />
              </main>
            </div>
          </>
        </RootProvider>
      </WebSocketProvider>
    </SessionProvider>
  )
}

export default App
