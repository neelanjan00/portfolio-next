import { React, useState, useEffect, forwardRef } from 'react';
import useWindowSize from '../../hooks/useWindow';
import { getTwitterIcon, getLinkedInIcon, getFacebookIcon, getRedditIcon } from '../../assets/inline-svgs';
import useScrollHeight from '../../hooks/useScrollHeight';

let VerticalShareIcons = (props, ref) => {

    const { blogMetadata, blogContent } = props;
    const { footerRef } = ref;

    const [bottomOffset, setBottomOffset] = useState(0);
    const [pageURL, setPageURL] = useState("");

    const scrollHeight = useScrollHeight();

    const [width] = useWindowSize();

    useEffect(() => {
        if (blogContent !== "") {
            setBottomOffset(footerRef.current.offsetTop)
        }
    }, [blogContent, scrollHeight, footerRef])

    useEffect(() => {
        setPageURL(window.location.href);
    }, [])

    return (
        <div style={{
            position: 'sticky',
            top: '37%',
            marginLeft: '7%',
            width: 'fit-content',
            display: scrollHeight !== 0 && scrollHeight > 850 && scrollHeight < bottomOffset - 1090 && width > 1280 ? 'block' : 'none'
        }}>
            <div className='my-5' role='button'>
                <a href={'https://twitter.com/intent/tweet?text=' + blogMetadata.title + ' by @NeelanjanManna&url=' + pageURL} rel="noreferrer" target='_blank'>
                    {getTwitterIcon('black')}
                </a>
            </div>
            <div className='my-5' role='button'>
                <a href={'https://www.linkedin.com/sharing/share-offsite/?url=' + pageURL} rel="noreferrer" target='_blank'>
                    {getLinkedInIcon('black')}
                </a>
            </div>
            <div className='my-5' role='button'>
                <a href={'https://www.facebook.com/sharer/sharer.php?u=' + pageURL} rel="noreferrer" target='_blank'>
                    {getFacebookIcon('black')}
                </a>
            </div>
            <div className='my-5' role='button'>
                <a href={'https://www.reddit.com/submit?url=' + pageURL + '&title=' + blogMetadata.title} rel="noreferrer" target='_blank'>
                    {getRedditIcon('black')}
                </a>
            </div>
        </div>
    );
}

export default forwardRef(VerticalShareIcons);
