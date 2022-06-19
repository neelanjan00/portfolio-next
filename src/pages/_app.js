import { AuthProvider } from '../hooks/useAuth';
import AuthStateChanged from '../layout/authStateChanged';
import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';

import DefaultHead from '../heads/default-head';

function MyApp({ Component, pageProps }) {

  return (
    <>
      {/* <DefaultHead /> */}
      {/* <DefaultSeo
            title="Neelanjan Manna"
            titleTemplate="Neelanjan Manna"
            defaultTitle="Neelanjan Manna"
            description="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project."
            canonical="https://www.neelanjanmanna.ml/"
            openGraph={{
              url: "https://www.neelanjan.dev/",
              title: "Neelanjan Manna",
              description: "Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project.",
              images: [
                {
                  url: "/portrait.png",
                  width: 400,
                  height: 400,
                  alt: "Neelanjan Manna",
                },
              ],
            }}
            twitter={{
              handle: "@NeelanjanManna",
              site: "@NeelanjanManna",
              cardType: "summary_large_image",
            }}
          /> */}
      <AuthProvider>
        <AuthStateChanged>
          <Component {...pageProps} />
        </AuthStateChanged>
      </AuthProvider>
    </>
  )
}

export default MyApp
