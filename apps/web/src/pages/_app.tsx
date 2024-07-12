import { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/global.css'
import { SessionProvider } from 'next-auth/react'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  )
}

export default App
