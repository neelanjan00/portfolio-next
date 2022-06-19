import Head from 'next/head';

export default function BlogHead({ title, description, image, blogID }) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="author" content="Neelanjan Manna" />
            <title key="title">{title}</title>
            <meta name="description" content={description} key="description" />
            <meta property="og:locale" content="en_US" key="og-locale" />
            <meta property="og:title" content={title} key="og-title" />
            <meta property="og:type" content="article" key="og-type" />
            <meta property="og:url" content={`https://www.neelanjan.dev/blog/${blogID}`} key="og-url" />
            <meta property="og:image" content={image} key="og-image" />
            <meta property="og:image:width" content="1500" key="og-image-width" />
            <meta property="og:image:height" content="850" key="og-image-height" />
            <meta property="og:image:alt" content={title} key="og-image-alt" />
            <meta property="og:description" content={description} key="og-description" />
            <meta property="og:site_name" content="Neelanjan Manna" key="og-site-name" />
            <meta property="og:locale" content="en_US" />
            <meta property="article:publisher" content="https://www.neelanjan.dev" />
            <meta property="article:section" content="Coding" />
            <meta property="article:tag" content="Coding" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} key="twitter-title" />
            <meta name="twitter:description" content={description} key="twitter-description" />
            <meta name="twitter:image" content={image} key="twitter-image" />
            <meta name="twitter:site" content="@NeelanjanManna" />
            <meta name="twitter:creator" content="@NeelanjanManna" />
            <meta name="page-type" content="Blogging" />
            <meta name="robots" content="index, follow" />
        </Head>
    );
}
