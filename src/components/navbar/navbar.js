import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { getBlogIcon, getProjectIcon, getContactMeIcon, getLogoutIcon, getHamburgerIcon, getAboutMeIcon, getTalksIcon, getCancelIcon } from '../../assets/inline-svgs';
import MobileNavbarTile from '../mobile-navbar-tile/mobile-navbar-tile';

import useWindowSize from '../../hooks/useWindow';
import useOutsideClick from '../../hooks/useClickOutside';

import Image from 'next/image';
import useScrollHeight from '../../hooks/useScrollHeight';
import useAuth from '../../hooks/useAuth';

const Navbar = ({ isAboutMeVisible, isMyTalksVisible }) => {

    const scrollHeight = useScrollHeight();
    const [previousScrollPosition, setPreviousScrollPosition] = useState(window.scrollY);
    const [displayMobileNavbar, setDisplayMobileNavbar] = useState(true);
    const [displaySidebar, setDisplaySidebar] = useState(false);
    const { asPath } = useRouter()
    const [width] = useWindowSize()
    const { user, logout } = useAuth()

    const sidebarRef = useRef();
    const hamburgerIconRef = useRef();

    const isClickedOutside = useOutsideClick(sidebarRef, hamburgerIconRef)

    useEffect(() => {
        if (isClickedOutside && displaySidebar)
            setDisplaySidebar(false)
    }, [isClickedOutside, displaySidebar])

    useEffect(() => {
        window.addEventListener('scroll', setMobileNavbarVisibility);

        return () => window.removeEventListener('scroll', setMobileNavbarVisibility);
    })

    function setMobileNavbarVisibility() {

        setDisplayMobileNavbar(previousScrollPosition > window.scrollY);
        setPreviousScrollPosition(window.scrollY);
    }

    const logoutHandler = event => {
        event.preventDefault()

        logout();
    }

    const hamburgerToggler = () => {
        setDisplaySidebar(!displaySidebar)
    }

    const scrollToBottom = () => {
        window.scroll({
            top: document.body.offsetHeight,
            left: 0,
            behavior: 'smooth',
        });
    }

    const contactMeMobileView = event => {
        event.preventDefault()

        scrollToBottom()
        setDisplaySidebar(false)
    }

    var navbarStyle = {
        position: 'fixed',
        zIndex: '2',
        color: 'white',
        minWidth: '100%',
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'saturate(100%) blur(8px)',
        top: displayMobileNavbar ? '0' : '-65px',
        transition: 'top 0.3s',
    }

    if (width >= 1280) {
        return (
            <>
                <div style={navbarStyle} className="pr-5 p-3">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'white', cursor: 'pointer' }}>
                            <h3 style={{ fontWeight: '500', display: 'inline' }}>Neelanjan Manna</h3>
                        </span>
                    </Link>
                    <div style={{ float: 'right' }}>
                        <Link href="/#about-me" style={{ textDecoration: 'none' }}>
                            <span style={{ color: 'white', cursor: 'pointer', textDecoration: isAboutMeVisible ? 'underline' : 'none', textUnderlineOffset: '5px' }}>
                                <h5 style={{ display: 'inline' }}>About Me</h5>
                            </span>
                        </Link>
                        <Link href="/#my-talks" style={{ textDecoration: 'none' }}>
                            <span className='ml-5' style={{ color: 'white', cursor: 'pointer', textDecoration: isMyTalksVisible ? 'underline' : 'none', textUnderlineOffset: '5px' }}>
                                <h5 style={{ display: 'inline' }}>Talks</h5>
                            </span>
                        </Link>
                        <Link href="/blog" style={{ textDecoration: 'none' }}>
                            <span className="ml-5" style={{ color: 'white', cursor: 'pointer', textDecoration: asPath.includes('blog') ? 'underline' : 'none', textUnderlineOffset: '5px' }}>
                                <h5 style={{ display: 'inline' }}>Blogs</h5>
                            </span>
                        </Link>
                        <Link href="/projects" style={{ textDecoration: 'none' }}>
                            <span className="ml-5" style={{ color: 'white', cursor: 'pointer', textDecoration: asPath === '/projects' ? 'underline' : 'none', textUnderlineOffset: '5px' }}>
                                <h5 style={{ display: 'inline' }}>Projects</h5>
                            </span>
                        </Link>
                        <span className="ml-5" style={{ color: 'white', cursor: 'pointer' }}>
                            <h5 style={{ display: 'inline' }} onClick={scrollToBottom}>Contact Me</h5>
                        </span>
                        {
                            user === null
                                ? null
                                : <span className="ml-5" onClick={logoutHandler} style={{ color: 'white', cursor: 'pointer' }}>
                                    <h5 style={{ display: 'inline' }}>Logout</h5>
                                </span>
                        }
                    </div>
                </div>
                {
                    asPath === '/' || asPath === '/#about-me' || asPath === '/#my-talks' || asPath === '/blog' || asPath === '/projects' 
                        ? null
                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
                        </svg>
                }
            </>
        )
    } else {
        return (
            <>
                <div className="p-2" ref={hamburgerIconRef} style={{
                    minWidth: '100vw', maxHeight: '50px', background: 'rgba(0,0,0,0.75)',
                    position: 'fixed', top: displayMobileNavbar ? '0' : '-50px',
                    transition: 'top 0.3s', zIndex: '3', backdropFilter: 'saturate(100%) blur(8px)'
                }} >

                    <span onClick={hamburgerToggler}>
                        {getHamburgerIcon('white')}
                    </span>
                </div>
                <div ref={sidebarRef} style={{
                    zIndex: '3', width: displaySidebar ? '250px' : '0',
                    backgroundColor: '#1e1e1e', position: 'fixed', transition: '0.3s',
                    height: '105vh', display: 'flex', alignItems: 'center', top: '-10px'
                }}>
                    <div>
                        <div style={{ display: displaySidebar ? 'grid' : 'none', placeItems: 'center', minHeight: '100px' }} className='mb-5'>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <Image className='img-fluid' width="100" height="100" src='/favicon.ico' alt='logo' />
                            </Link>
                        </div>
                        <MobileNavbarTile icon={getAboutMeIcon('white')} label="About Me" highlightNavigation={isAboutMeVisible} route="/#about-me" displaySidebar={displaySidebar} />
                        <MobileNavbarTile icon={getTalksIcon('white')} label="Talks" highlightNavigation={isMyTalksVisible} route="/#my-talks" displaySidebar={displaySidebar} />
                        <MobileNavbarTile icon={getBlogIcon('white')} label="Blogs" highlightNavigation={asPath.includes('blog')} route="/blog" displaySidebar={displaySidebar} />
                        <MobileNavbarTile icon={getProjectIcon('white')} label="Project" highlightNavigation={asPath === '/projects'} route="/projects" displaySidebar={displaySidebar} />
                        <MobileNavbarTile icon={getContactMeIcon('white')} label="Contact Me" clickHandler={contactMeMobileView} displaySidebar={displaySidebar} />

                        {
                            user === null
                                ? null
                                : <MobileNavbarTile icon={getLogoutIcon('white')} label="Logout" clickHandler={logoutHandler} displaySidebar={displaySidebar} />
                        }
                    </div>
                </div>
                <div style={{
                    position: 'fixed',
                    zIndex: '4',
                    top: '0',
                    display: displaySidebar ? 'block' : 'none'
                }}
                    onClick={hamburgerToggler}>
                    <div style={{ marginLeft: '5px', marginTop: '5px' }}>
                        {getCancelIcon('white')}
                    </div>
                </div>
                <div style={{ display: displaySidebar ? 'block' : 'none', position: 'fixed', width: '100vw', top: '-50px', height: '110vh', zIndex: '2', backdropFilter: 'saturate(100%) blur(8px)' }} />
                {
                    asPath === '/' || asPath === '/#about-me' || asPath === '/#my-talks' || asPath === '/blog' || asPath === '/projects'
                        ? null
                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
                        </svg>
                }
            </>
        )
    }
}

export default Navbar;