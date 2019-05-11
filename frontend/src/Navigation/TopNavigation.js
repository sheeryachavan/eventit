import React from 'react';
import './DrawerToggleButton'
import './TopNavigation.css';
import DrawerToggleButton from './DrawerToggleButton';
import { checkPropTypes } from 'prop-types';
import { connect } from "react-redux";
import { Component } from 'react';
import axios from 'axios';
class navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        }
    }
    componentDidMount() {
        axios.get(`https://localhost:3001/eventit/user/${this.props.id}`)
            .then(response => {
                this.setState({userData:response});
            })
    }

    render() {
        let UserLoggedIn = null;
        if (this.props.id != null) {
            UserLoggedIn =
                <li>
                    <a href="/user"> Hi! {this.state.userData.userName}</a>
                </li>
                ;
        }
        return (<header className="clsToolbar">
            <nav className="clsToolbarNavigation">
                <div className="clsToolbarToggleButton">
                    <DrawerToggleButton click={this.props.drawerClickHandler} />
                </div>
                <div className="clsToolbarLogo"><a href='/'>LOGO</a></div>
                <div className="spacer"></div>
                <div className="clsToolbarNavigationItems">
                    <ul>
                        <li>
                            <a href="/events"> All Events</a>
                        </li>
                        {UserLoggedIn}
                    </ul>
                </div>
            </nav>
        </header>
        );
    }
}


const mapStateToProps = (state) => {

    console.log("home comp redux-state");
    console.log(state);
    return {
        id: state.authentication.id
    };
}

export default connect(mapStateToProps)(navbar);
// export default navbar;