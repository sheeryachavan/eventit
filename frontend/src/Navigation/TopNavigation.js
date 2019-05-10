import React from 'react';
import './DrawerToggleButton'
import './TopNavigation.css';
import DrawerToggleButton from './DrawerToggleButton';
import { checkPropTypes } from 'prop-types';
const navbar = props => (
    <header className="clsToolbar">
        <nav className="clsToolbarNavigation">
            <div className = "clsToolbarToggleButton">
                <DrawerToggleButton click ={props.drawerClickHandler}/>
            </div>
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