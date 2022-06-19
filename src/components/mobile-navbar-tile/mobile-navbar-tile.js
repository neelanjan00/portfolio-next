import React from 'react';
import Link from 'next/link';

const MobileNavbarTile = props => {

    const { icon, clickHandler, label, highlightNavigation, route, displaySidebar } = props

    return (
        <div style={{ margin: '10px' }}>
            <Link href={route ? route : "#"}>
                <div style={{
                    color: 'white',
                    padding: '13px',
                    fontSize: '20px',
                    backgroundColor: highlightNavigation ? '#3c3c3c' : 'inherit',
                    borderRadius: '7px',
                    display: displaySidebar ? 'block' : 'none',
                    minWidth: '200px'
                }} onClick={clickHandler ? clickHandler : null}>
                    <div style={{ display: 'inline-block' }}>
                        <span style={{ display: 'inline' }} className='ml-4 mr-2'>{icon}</span>
                        <p className="ml-2" style={{ display: "inline" }}>{label}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MobileNavbarTile;
