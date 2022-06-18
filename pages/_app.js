import { AuthProvider } from '../hooks/useAuth';
import AuthStateChanged from '../layout/authStateChanged';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />
      </AuthStateChanged>
    </AuthProvider>
  )
}

export default MyApp
