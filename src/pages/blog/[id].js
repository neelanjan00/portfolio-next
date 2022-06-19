import { useRef } from 'react';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import ReactMarkdown from 'react-markdown';
import { db } from '../../services/firebase';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import useWindowSize from '../../hooks/useWindow';
import rehypeRaw from 'rehype-raw';
import { getLoadingSpinner } from '../../assets/inline-svgs';

import styles from '../../styles/blog.module.css';
import VerticalShareIcons from '../../components/vertical-share-icons/vertical-share-icons';
import HorizontalShareIcons from '../../components/horizontal-share-icons/horizontal-share-icons';
import Image from 'next/image';
import BlogHead from '../../heads/blog-head';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

const getDateFromDateTime = dateTime => {
    const dateTimeString = new Date(dateTime).toString()
    const dateTimeStringArray = dateTimeString.split(" ")

    return `${dateTimeStringArray[1]} ${dateTimeStringArray[2]}, ${dateTimeStringArray[3]}`
}

const CodeBlock = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

const Blog = ({ coverImageURL, dateTime, title, contentPreview, blogContent }) => {

    const [width] = useWindowSize();
    const footerRef = useRef(null);

    return (
        <>
            <Head>
                <title key="title">Why Did I Contribute to the LitmusChaos Project for Hacktoberfest 2021</title>
                <meta name="description" content="Demo Content" key="description" />
                <meta property="og:title" content="Why Did I Contribute to the LitmusChaos Project for Hacktoberfest 2021" key="og-title" />
                <meta property="og:description" content="Demo Content" key="og-description" />
                <meta property="og:image" content={coverImageURL} key="og-image" />
                <meta name="twitter:title" content="Why Did I Contribute to the LitmusChaos Project for Hacktoberfest 2021" key="twitter-title" />
                <meta name="twitter:description" content="Demo Content" key="twitter-description" />
                <meta name="twitter:image" content={coverImageURL} key="twitter-image" />
            </Head>

            {/* <NextSeo
                title={title}
                titleTemplate={title}
                defaultTitle={title}
                description={contentPreview}
                canonical="https://www.neelanjanmanna.ml/"
                openGraph={{
                    url: "https://www.neelanjan.dev/",
                    title: title,
                    description: contentPreview,
                    images: [
                        {
                            url: coverImageURL,
                            width: 400,
                            height: 400,
                            alt: title,
                        },
                    ],
                }}
                twitter={{
                    handle: "@NeelanjanManna",
                    site: "@NeelanjanManna",
                    cardType: "summary_large_image",
                }}
            /> */}
            {/* <BlogHead title={title ?? title} description={contentPreview ?? contentPreview} image={coverImageURL ?? coverImageURL} /> */}
            <div>
                <Navbar />

                <VerticalShareIcons
                    blogMetadata={{ coverImageURL, dateTime, title, blogContent }}
                    blogContent={blogContent}
                    ref={{ footerRef: footerRef }} />

                <div className='container'>
                    <h5>{dateTime !== "" ? getDateFromDateTime(dateTime) : ""}</h5>
                    <h1 style={{ fontWeight: 700 }} className='pb-4'>{title}</h1>
                    {
                        coverImageURL !== ""
                            ? <Image src={coverImageURL} quality={100} width="1500" height="850" objectFit='contain' alt="blog cover" className='img-fluid' />
                            : null
                    }
                    <div style={{
                        paddingLeft: width >= 1280 ? '170px' : '0px',
                        paddingRight: width >= 1280 ? '170px' : '0px',
                    }} className={styles.blogPage}>
                        {blogContent !== "" ? <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={CodeBlock}>{blogContent}</ReactMarkdown> : getLoadingSpinner()}
                    </div>
                    <HorizontalShareIcons blogContent={blogContent} blogMetadata={{ coverImageURL, dateTime, title, blogContent }} />
                </div>

                <div ref={footerRef}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export async function getStaticProps(context) {

    const id = context.params.id;

    const blogRef = db.collection('blogs')
    try {
        const blogSnapshot = await blogRef.doc(id).get();
        const blogMetadata = blogSnapshot.data();
        const response = await fetch(blogMetadata.markdownURL);
        const blogContent = await response.text();
        return {
            props: {
                blogContent,
                ...blogMetadata
            },
            revalidate: 86400
        }
    } catch (err) {
        console.log(err);
    }
}

export async function getStaticPaths() {

    const blogsRef = db.collection('blogs')
    try {
        const blogsSnapshot = await blogsRef.orderBy('dateTime', 'desc').get();
        const paths = blogsSnapshot.docs.map(doc => ({ params: { id: doc.id } }))

        return {
            paths,
            fallback: false
        }
    } catch (err) {
        console.log(err);
    }
}

export default Blog;
