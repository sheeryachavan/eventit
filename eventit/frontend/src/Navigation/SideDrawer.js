import React from 'react';
import './SideDrawer.css';
const SideDrawer = props => {
    let drawerClasser = ['clsSideDrawer'];
    if(props.show){
        drawerClasser = ['clsSideDrawer','open']
    }
    return (
        <nav className={drawerClasser.join(' ')} >
            <ul>
                <li>
                    <a href="/events">Events</a>
                </li>
            </ul>
        </nav>
    )
}
export default SideDrawer;