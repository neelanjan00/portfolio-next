import '../styles/globals.css';
import { useRouter } from 'next/router';
import DefaultHead from '../heads/default-head';

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();

  return (
    <>
      {
        asPath.match('/blog/(.*)') ?
          <Component {...pageProps} />
        :
          <>
            <DefaultHead />
            <Component {...pageProps} />
          </>
      }
    </>
  )
}

export default MyApp
