import { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/global.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
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
  )
}

export default App
