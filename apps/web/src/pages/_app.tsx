import { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/global.css'
import { RootProvider } from '@/providers/RootProvider'
import { WebSocketProvider } from '@/providers'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <RootProvider session={session}>
      <WebSocketProvider>
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
      </WebSocketProvider>
    </RootProvider>
  )
}

export default App
