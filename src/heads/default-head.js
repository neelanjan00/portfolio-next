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
            <meta property="og:locale" content="en_US" key="og-locale" />
            <meta property="og:title" content="Neelanjan Manna" key="og-title" />
            <meta property="og:type" content="website" key="og-type" />
            <meta property="og:url" content="https://neelanjan.dev/" key="og-url" />
            <meta property="og:image" content="%PUBLIC_URL%/portrait.png" key="og-image" />
            <meta property="og:image:width" content="500" key="og-image-width" />
            <meta property="og:image:height" content="500" key="og-image-height" />
            <meta property="og:image:alt" content={title} key="og-image-alt" />
            <meta property="og:description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." key="og-description" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content="Neelanjan Manna" />
            <meta name="twitter:title" content="Neelanjan Manna" key="twitter-title" />
            <meta name="twitter:description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." key="twitter-description" />
            <meta name="twitter:image" content="%PUBLIC_URL%/portrait.png" key="twitter-image" />
            <meta name="twitter:site" content="@NeelanjanManna" />
            <meta name="twitter:creator" content="@NeelanjanManna" />
            <link rel='icon' href='%PUBLIC_URL%/favicon.ico' />
            <meta name="robots" content="index, follow" />
            <meta name="page-topic" content="Media" />
            <meta name="page-type" content="Blogging" />
            <meta name="audience" content="Everyone" />
        </Head>
    );
}