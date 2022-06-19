import { AuthProvider } from '../hooks/useAuth';
import AuthStateChanged from '../layout/authStateChanged';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import DefaultHead from '../heads/default-head';

function MyApp({ Component, pageProps }) {

  const { asPath } = useRouter();

  return (
    <>
      {
        asPath.match('/blog/(.*)')
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
