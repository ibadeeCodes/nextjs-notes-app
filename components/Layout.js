import Navbar from './Navbar'
import Head from 'next/head'
const Layout = ({ children }) => (
  <>
    <Head>
      <title>Note App</title>
    </Head>
    <Navbar />
    {children}
  </>
)

export default Layout
