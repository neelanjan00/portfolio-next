import React from 'react';
import { getTwitterIcon, getLinkedInIcon, getFacebookIcon, getRedditIcon } from '../../assets/inline-svgs';

const HorizontalShareIcons = ({blogContent, blogMetadata}) => {
    return (
        <div className='mt-5' style={{ display: blogContent ? 'block' : 'none' }}>
            <h4 className='py-4'>Share this post:</h4>
            <span className='mx-2 mx-sm-4 mx-lg-5' role='button'>
                <a href={'https://twitter.com/intent/tweet?text=' + blogMetadata.title + ' by @NeelanjanManna&url=' + window.location.href} rel="noreferrer" target='_blank'>
                    {getTwitterIcon('black')}
                </a>
            </span>
            <span className='mx-2 mx-sm-4 mx-lg-5' role='button'>
                <a href={'https://www.linkedin.com/sharing/share-offsite/?url=' + window.location.href} rel="noreferrer" target='_blank'>
                    {getLinkedInIcon('black')}
                </a>
            </span>
            <span className='mx-2 mx-sm-4 mx-lg-5' role='button'>
                <a href={'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href} rel="noreferrer" target='_blank'>
                    {getFacebookIcon('black')}
                </a>
            </span>
            <span className='mx-2 mx-sm-4 mx-lg-5' role='button'>
                <a href={'https://www.reddit.com/submit?url=' + window.location.href + '&title=' + blogMetadata.title} rel="noreferrer" target='_blank'>
                    {getRedditIcon('black')}
                </a>
            </span>
        </div>
    );
}

export default HorizontalShareIcons;
