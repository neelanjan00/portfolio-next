import BlogTile from '../../components/blog-tile/blog-tile';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

import { db } from '../../services/firebase';
import { getLoadingSpinner } from '../../assets/inline-svgs';

const Blogs = ({ blogsMetadata }) => {

    return (
        <div>
            <Navbar />
            <div className='container'>
                <h1 style={{ textAlign: 'center', fontWeight: '800' }}>MY BLOGS</h1>
                <div>
                    {
                        blogsMetadata.length !== 0 ? blogsMetadata.map(blog => {
                            return <BlogTile blogData={blog} key={blog.dateTime} />
                        }) : <div className='mt-5'>{getLoadingSpinner()}</div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const blogsRef = db.collection('blogs')
    try {
        const blogsSnapshot = await blogsRef.orderBy('dateTime', 'desc').get();
        const blogsMetadata = blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return {
            props: {
                blogsMetadata
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export default Blogs;