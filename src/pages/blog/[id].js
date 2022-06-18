import { useEffect, useState, useRef } from 'react';
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

const Blog = (props) => {

    const { coverImageURL, dateTime, title, blogContent } = props;

    const [width] = useWindowSize();
    const footerRef = useRef(null);

    return (
        <div>
            <Navbar />

            <VerticalShareIcons
                blogMetadata={props}
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
                <HorizontalShareIcons blogContent={blogContent} blogMetadata={props} />
            </div>

            <div ref={footerRef}>
                <Footer />
            </div>
        </div>
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
            }
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
