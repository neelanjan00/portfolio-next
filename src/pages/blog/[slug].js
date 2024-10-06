import { useRef } from 'react';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import ReactMarkdown from 'react-markdown';
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
import { AuthProvider } from '../../hooks/useAuth';
import AuthStateChanged from '../../layout/authStateChanged';
import { client } from '../../services/contentful/client';

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

const Blog = ({ post }) => {

    const [width] = useWindowSize();
    const footerRef = useRef(null);

    return (
        <>
            <BlogHead title={post.fields.title} description={post.fields.summary}
                image={"https:" + post.fields.headerImage.fields.file.url}
                slug={post.fields.slug} />

            <div style={{ marginTop: '100px' }}>
                <AuthProvider>
                    <AuthStateChanged>
                        <Navbar />
                    </AuthStateChanged>
                </AuthProvider>

                {/* <VerticalShareIcons
                    blogMetadata={{ coverImageURL, dateTime, title, blogContent }}
                    blogContent={blogContent}
                    ref={{ footerRef: footerRef }} /> */}

                <div className='container'>
                    <h5>{post.fields.date !== "" ? getDateFromDateTime(post.fields.date) : ""}</h5>
                    <h1 style={{ fontWeight: 700 }} className='pb-4'>{post.fields.title}</h1>
                    {
                        post.fields.headerImage.fields.file.url !== "" ?
                            <Image src={"https:" + post.fields.headerImage.fields.file.url}
                                quality={100} width="1500" height="850" objectFit='contain'
                                alt={post.fields.title} className='img-fluid' />
                        :
                            null
                    }
                    <div style={{
                        paddingLeft: width >= 1280 ? '170px' : '0px',
                        paddingRight: width >= 1280 ? '170px' : '0px',
                    }} className={styles.blogPage}>
                        {post.fields.content !== "" ? <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={CodeBlock}>{post.fields.content}</ReactMarkdown> : getLoadingSpinner()}
                    </div>
                    {/* <HorizontalShareIcons blogContent={blogContent} blogMetadata={{ coverImageURL, dateTime, title, blogContent }} /> */}
                </div>

                <div ref={footerRef}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

// getStaticProps will get individual blog posts
// next.js will call this function to pass a context object having params and preview fields
// the returned props object will be then used in the Blog component above.
export async function getStaticProps({ params, preview = false }) {
    const { slug } = params;

    try {
        const blogPostRef = await client.getEntries({
            content_type: 'blogPost',
            'fields.slug': slug
        })

        return {
            props: {
                post: blogPostRef?.items?.[0],
                revalidate: 86400
            },
        }
    } catch (err) {
        console.log(err);
    }
}

export async function getStaticPaths() {
    try {
        const blogPostRef = await client.getEntries({
            content_type: 'blogPost',
            order: '-fields.date'
        });

        const paths = blogPostRef.items.map(post => ({
            params: { slug: post.fields.slug },
        }))

        return {
            paths,
            fallback: false
        }
    } catch (err) {
        console.log(err);
    }
}

export default Blog;
