import { useRouter } from 'next/router';
import React from 'react';
import useAuth from './useAuth';
import { getLoadingSpinner } from '../assets/inline-svgs';

export function withPublic(Component) {
    return function WithPublic(props) {
        
        const auth = useAuth(); 
        const router = useRouter();

        if(auth.user) {
            router.replace('/admin');
            return (
                <div style={{minHeight: '50vw', display: 'grid', placeItems: 'center'}}>
                    {getLoadingSpinner()}
                </div>
            )
        }

        return <Component auth={auth} {...props} />
    }
};

export function withProtected(Component) {
    return function WithProtected(props) {
        
        const auth = useAuth(); 
        const router = useRouter();

        if(!auth.user) {
            router.replace('/login');
            return (
                <div style={{minHeight: '50vw', display: 'grid', placeItems: 'center'}}>
                    {getLoadingSpinner()}
                </div>
            )
        }

        return <Component auth={auth} {...props} />
    }
}