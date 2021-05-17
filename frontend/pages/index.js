import Head from 'next/head'
import Login from '../component/auth/login'
export default function Home() {
  return (
    <div >
      <Head>
        <title>memories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login></Login>
    </div>
  )
}
