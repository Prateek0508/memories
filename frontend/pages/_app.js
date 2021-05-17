import '../static/styles/index.css';
import '../static/styles/styles.css';
import Layout from '../component/layout'
function MyApp({ Component, pageProps }) {
  return <Layout> <Component {...pageProps} /></Layout>
}

export default MyApp
