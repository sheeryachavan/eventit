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
        if (this.props.id) {
            var config = {
                headers: { 'Access-Control-Allow-Origin': "*" }
            };
            this.setState({ userData : axios.get(`localhost:3001/eventit/user/profile/${this.props.id}`, config)});
        }
        debugger;
    }
    async changeUser() {
        var config = {
            headers: { 'Access-Control-Allow-Origin': "*" }
        };
        return axios.get(`localhost:3001/eventit/user/profile/${this.props.id}`, config);
        // debugger;
        // console.log(`localhost:3001/eventit/user/profile/${this.props.id}`);

    }
    render() {
        let UserLoggedIn = null;
        var a = null;
        if (this.props.id != null && this.state.userData != null) {
            var username = String(this.state.userData.name).split(" ")[0];
            UserLoggedIn =
                <li>
                    <a href="/user"> Hi! {username}</a>
                </li>
                ;
                a = this.state.userData.name
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