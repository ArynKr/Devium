import Head from 'next/head'
import Header from '../Header'

const Main: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Aryan Kumar - Homepage </title>
      </Head>

      <Header />

      <div>{children}</div>
    </div>
  )
}

export default Main
