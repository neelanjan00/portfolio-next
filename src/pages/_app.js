import '../styles/globals.css';
import { useRouter } from 'next/router';
import DefaultHead from '../heads/default-head';
import { Source_Sans_3, Fira_Code } from 'next/font/google';

// Load Source Sans Pro with specific weights
const sourceSansPro = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700'],
  variable: '--font-source-sans-pro', // Define a CSS variable name for this font
});

// Load Fira Code for monospace styling
const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code', // Define a CSS variable name for this font
});

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();

  return (
    <main className={`${sourceSansPro.variable} ${firaCode.variable}`}>
      {
        asPath.match('/blog/(.*)') ?
          <Component {...pageProps} />
        :
          <>
            <DefaultHead />
            <Component {...pageProps} />
          </>
      }
    </main>
  )
}

export default MyApp
