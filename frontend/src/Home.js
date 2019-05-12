import React, { Component } from 'react';
import './App.css';
import CreateAccount from './User/CreateAccount'
import Login from './User/Login'
import { Container, Col } from 'react-bootstrap'
import SearchEvent from './SearchEvent'
import { connect } from "react-redux";
import  EventContainer  from './Events';
import { text } from '@fortawesome/fontawesome-svg-core';
import viewUser from './User/viewUser'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Home extends Component {
    clickHandler() {

    }
    render() {
        return (
            <div>

                <SearchEvent ></SearchEvent>
                <EventContainer></EventContainer>
            </div>
        );
    }
}

//   export default Home;

const mapStateToProps = (state) => {

    console.log("home comp redux-state");
    console.log(state);
    // state.authentication.id
    return { id: state.authentication.id };
}

export default connect(mapStateToProps)(Home);