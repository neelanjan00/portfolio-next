import Head from 'next/head';

const BlogHead = ({ title, description, image }) => {
    return (
        <Head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="author" content="Neelanjan Manna" />
            <title key="title">{title}</title>
            <meta name="description" content={description} key="description" />
            <meta property="og:title" content={title} key="og-title" />
            <meta property="og:description" content={description} key="og-description" />
            <meta property="og:image" content={image} key="og-image" />
            <meta name="twitter:title" content={title} key="twitter-title" />
            <meta name="twitter:description" content={description} key="twitter-description" />
            <meta name="twitter:image" content={image} key="twitter-image" />
        </Head>
    );
}

export default BlogHead;
