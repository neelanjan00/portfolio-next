import { useLayoutEffect, useState } from 'react';

function useScrollHeight() {
    
    const [scrollHeight, setScrollHeight] = useState(0)

    useLayoutEffect(() => {

        function updateScrollheight() {
            setScrollHeight(document.documentElement.scrollTop);
        }

        window.addEventListener('scroll', updateScrollheight)
        updateScrollheight()

        return () => window.removeEventListener('scroll', updateScrollheight)
    }, []);

    return scrollHeight;
}

export default useScrollHeight;