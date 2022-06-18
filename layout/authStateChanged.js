import { useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import useAuth from '../hooks/useAuth';
import { getLoadingSpinner } from '../assets/inline-svgs';

export default function AuthStateChanged({ children }) {

    const { setUser } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        })
        //eslint-disable-next-line
    }, []);

    if(loading) {
        return (
            <div style={{minHeight: '50vw', display: 'grid', placeItems: 'center'}}>
                {getLoadingSpinner()}
            </div>
        )
    }

    return children;
}