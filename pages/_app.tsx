import Main from '../components/layouts/Main'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  )
}

export default MyApp
