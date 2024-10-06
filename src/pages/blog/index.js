import BlogTile from '../../components/blog-tile/blog-tile';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

import { getLoadingSpinner } from '../../assets/inline-svgs';
import { client } from '../../services/contentful/client';

const Blogs = ({ posts }) => {
    return (
        <div style={{ marginTop: '100px' }}>
            <Navbar />
            <div className='container'>
                <h1 style={{ textAlign: 'center', fontWeight: '800' }}>MY BLOGS</h1>
                <div>
                    {
                        posts.items.length !== 0 ?
                            posts.items.map(post => <BlogTile post={post} key={post.fields.slug} />)
                        :
                            <div className='mt-5'>{getLoadingSpinner()}</div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    try {
        const blogPostRef = await client.getEntries({
            content_type: 'blogPost',
            order: '-fields.date'
        });

        return {
            props: {
                posts: blogPostRef,
                revalidate: 86400
            },
        }
    } catch (err) {
        console.log(err);
    }
}

export default Blogs;