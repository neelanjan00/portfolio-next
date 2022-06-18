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
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="author" content="Neelanjan Manna" />
            <title>{title}</title>
            <meta name="description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." />
            <meta property="og:title" content="Neelanjan Manna" />
            <meta property="og:description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." />
            <meta property="og:image" content="%PUBLIC_URL%/portrait.png" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content="Neelanjan Manna" />
            <meta name="twitter:title" content="Neelanjan Manna" />
            <meta name="twitter:description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." />
            <meta name="twitter:image" content="%PUBLIC_URL%/portrait.png" />
        </Head>
    )
}