import React from 'react';
import './DrawerToggleButton'
import './TopNavigation.css';
import DrawerToggleButton from './DrawerToggleButton';
import { auth } from '../firebase';
import { connect } from "react-redux";
import { Component } from 'react';
import SearchEvent from '../SearchEvent'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            signedIn: false
        }
        this.signOutClick = this.signOutClick.bind(this)
    }
    componentDidMount() {
        if (this.props.id) {
            var config = {
                headers: { 'Access-Control-Allow-Origin': "*" }
            };
            this.setState({ userData: axios.get(`localhost:3001/eventit/user/profile/${this.props.id}`, config) });
        }
        debugger;
    }
    async changeUser() {
        var config = {
            headers: { 'Access-Control-Allow-Origin': "*" }
        };
        return axios.get(`localhost:3001/eventit/user/profile/${this.props.id}`, config);

    }
    signOutClick() {
        auth.signOut();
        var link = document.getElementById('signout');
        link.click();
        this.setState({ signedIn: !this.state.signedIn })
    }
    render() {
        let UserLoggedIn = null;
        var a = null;
        if (this.props.id != null) {
            // var username = String(this.state.userData.name).split(" ")[0];
            UserLoggedIn =
                <div className="clsToolbarNavigationItems">
                    <button className="btn btn-big btn-dark">
                        <Link className="showlink" to="/profile/user">
                            My Profile
          </Link>
                    </button>
                    <button className="btn btn-big btn-dark">
                        <Link className="showlink" to="/events">
                            All Events
          </Link>
                    </button><a href="/">
                        <button className="btn btn-big btn-dark" onClick={this.signOutClick}>

                            Signout

</button>
                    </a>

                    <Link to="/" style={{ hidden: true }} id="signout">
                    </Link>
                </div>
                ;
        }
        else {
            UserLoggedIn = <div className="clsToolbarNavigationItems">
                <button className="btn btn-big btn-dark">
                    <Link className="showlink" to="/login">
                        Login
                  </Link>
                </button>
                <button className="btn btn-big btn-dark">
                    <Link className="showlink" to="/signup">
                        Signup
                  </Link>
                </button>
            </div>
        }
        return (<header className="clsToolbar">
            <nav className="clsToolbarNavigation">
                <div className="clsToolbarToggleButton">
                    <DrawerToggleButton click={this.props.drawerClickHandler} />
                </div>

                <Link className="showlink" to="/">
                    <div className="clsToolbarLogo">LOGO</div>
                </Link>


                <div className="spacer"></div>

                <div className="spacer"></div>
                {UserLoggedIn}
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