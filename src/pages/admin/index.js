import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import { withProtected } from '../../hooks/useCustomRoutes';

const Admin = () => {

    const { asPath } = useRouter();

    return (
        <div>
            <Navbar />

            <div className='container' style={{ display: 'grid', placeItems: 'center' }}>
                <Link href={`${asPath}/add-projects`}>
                    <button className='btn btn-outline-dark my-3' style={{ width: '300px' }}>Add Projects</button>
                </Link>
                <Link href={`${asPath}/add-talks`}>
                    <button className='btn btn-outline-dark my-3' style={{ width: '300px' }}>Add Talk Videos</button>
                </Link>
                <Link href={`${asPath}/add-blogs`}>
                    <button className='btn btn-outline-dark my-3' style={{ width: '300px' }}>Add Blogs</button>
                </Link>
            </div>

            <Footer />
        </div>
    );
}

export default withProtected(Admin);