import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { getBlogIcon, getProjectIcon, getContactMeIcon, getLogoutIcon, getHamburgerIcon, getAboutMeIcon, getTalksIcon } from '../../assets/inline-svgs';
import { auth } from '../../services/firebase';
import MobileNavbarTile from '../mobile-navbar-tile/mobile-navbar-tile';

import useWindowSize from '../../hooks/useWindow';
import useOutsideClick from '../../hooks/useClickOutside';

import Image from 'next/image';
import useScrollHeight from '../../hooks/useScrollHeight';
import useAuth from '../../hooks/useAuth';

import DefaultHead from '../../heads/default-head';

const Navbar = () => {

    const scrollHeight = useScrollHeight();
    var [displaySidebar, setDisplaySidebar] = useState(false)
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
        backgroundColor: asPath === '/' || asPath === '/#about-me' || asPath === '/#my-talks' ? (scrollHeight > 700 ? 'black' : 'transparent') : 'black'
    }

    const isBlogRoute = () => {

        if(!asPath.includes('blog') || asPath.split('/').length === 2) {
            return false
        }

        return true;
    }

    if (width >= 1280) {
        return (
            <>
                {isBlogRoute() ? null : <DefaultHead />}

                <div style={navbarStyle} className="pr-5 p-3">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'white', cursor: 'pointer' }}>
                            <h3 style={{ fontWeight: '500', display: 'inline' }}>Neelanjan Manna</h3>
                        </span>
                    </Link>
                    <div style={{ float: 'right' }}>
                        <Link href="/#about-me" style={{ textDecoration: 'none' }}>
                            <span style={{ color: 'white', cursor: 'pointer' }}>
                                <h5 style={{ display: 'inline' }}>About Me</h5>
                            </span>
                        </Link>
                        <Link href="/#my-talks" style={{ textDecoration: 'none' }}>
                            <span className='ml-5' style={{ color: 'white', cursor: 'pointer' }}>
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
                    asPath === '/' || asPath === '/#about-me' || asPath === '/#my-talks'
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
                {isBlogRoute() ? null : <DefaultHead />}

                <div className="p-2" ref={hamburgerIconRef} style={{
                    minWidth: '100vw', backgroundColor: 'black',
                    position: 'sticky', top: '0', zIndex: '3'
                }} >
                    <span onClick={hamburgerToggler}>
                        {getHamburgerIcon('white')}
                    </span>
                </div>
                <div ref={sidebarRef} style={{
                    zIndex: '2', minHeight: '100vh', width: displaySidebar ? '250px' : '0',
                    backgroundColor: 'black', position: 'fixed', transition: '0.3s'
                }}>
                    <div style={{ display: displaySidebar ? 'grid' : 'none', placeItems: 'center', minHeight: '100px' }} className='my-5'>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Image className='img-fluid' width="100" height="100" src='/favicon.ico' alt='logo' />
                        </Link>
                    </div>
                    <MobileNavbarTile icon={getAboutMeIcon('white')} label="About Me" route="/#about-me" displaySidebar={displaySidebar} />
                    <MobileNavbarTile icon={getTalksIcon('white')} label="Talks" route="/#my-talks" displaySidebar={displaySidebar} />
                    <MobileNavbarTile icon={getBlogIcon('white')} label="Blogs" highlightNavigation={asPath.includes('blog')} route="/blog" displaySidebar={displaySidebar} />
                    <MobileNavbarTile icon={getProjectIcon('white')} label="Project" highlightNavigation={asPath === '/projects'} route="/projects" displaySidebar={displaySidebar} />
                    <MobileNavbarTile icon={getContactMeIcon('white')} label="Contact Me" clickHandler={contactMeMobileView} displaySidebar={displaySidebar} />

                    {
                        auth.currentUser === null
                            ? null
                            : <MobileNavbarTile icon={getLogoutIcon('white')} label="Logout" clickHandler={logoutHandler} displaySidebar={displaySidebar} />
                    }
                </div>
                {
                    asPath === '/' || asPath === '/#about-me' || asPath === '/#my-talks'
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