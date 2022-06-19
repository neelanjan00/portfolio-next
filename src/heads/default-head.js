import Head from "next/head";
import { useRouter } from "next/router";

export default function DefaultHead() {

    const { asPath } = useRouter();

    let title = "Neelanjan Manna"

    switch (asPath) {

        case '/projects':
            title = "Projects | " + title;
            break;

        case '/blog':
            title = "Blogs | " + title;

        default:
            break;
    }

    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="author" content="Neelanjan Manna" />
            <title key="title">{title}</title>
            <meta name="description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." key="description" />
            <meta property="og:title" content="Neelanjan Manna" key="og-title" />
            <meta property="og:description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." key="og-description" />
            <meta property="og:image" content="/portrait.png" key="og-image" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content="Neelanjan Manna" />
            <meta name="twitter:title" content="Neelanjan Manna" key="twitter-title" />
            <meta name="twitter:description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." key="twitter-description" />
            <meta name="twitter:image" content="/portrait.png" key="twitter-image" />
            <link rel='icon' href='/favicon.ico' />
            <meta name="robots" content="index, follow" />
            <meta name="page-topic" content="Media" />
            <meta name="page-type" content="Blogging" />
            <meta name="audience" content="Everyone" />
        </Head>
    )
}