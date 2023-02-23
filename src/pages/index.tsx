import Head from 'next/head';

import LogoMarquee from '../../components/LogoMarquee';
import NavigationBar from 'components/NavigationBar';
import Main from '../../components/Home/Main';
import Footer from '../../components/Home/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>liampreisser.com</title>
        <meta name="description" content="Liam Preisser's website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoMarquee />

      <NavigationBar />

      <Main />

      <Footer />
    </>
  )
}