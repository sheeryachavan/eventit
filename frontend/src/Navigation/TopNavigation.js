import React from 'react';
import './TopNavigation.css';
const navbar  = props =>(
    <header className="clsToolbar">
        <nav className="clsToolbarNavigation">
            <div></div>
            <div className="clsToolbarLogo"><a href='/'>LOGO</a></div>
            <div className="spacer"></div>
            <div className="clsToolbarNavigationItems">
                <ul>
                    <li>
                        <a href="/"> All Events</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
)
export default navbar;