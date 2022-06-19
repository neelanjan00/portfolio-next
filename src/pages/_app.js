import { AuthProvider } from '../hooks/useAuth';
import AuthStateChanged from '../layout/authStateChanged';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import DefaultHead from '../heads/default-head';

const isBlogRoute = (path) => {

  if(!path.includes('blog') || path.split('/').length === 2) {
      return false
  }

  return true;
}

function MyApp({ Component, pageProps }) {

  const { asPath } = useRouter();

  return (
    <>
      {
        isBlogRoute(asPath) 
        ? <Component {...pageProps} /> 
        : <>
            <DefaultHead />
            <AuthProvider>
              <AuthStateChanged>
                <Component {...pageProps} />
              </AuthStateChanged>
            </AuthProvider>
          </> 
      }
    </>
  )
}

export default MyApp
