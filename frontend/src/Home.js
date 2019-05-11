import React, { Component } from 'react';
import './App.css';
import CreateAccount from './User/CreateAccount'
import Login from './User/Login'
import { Container, Col } from 'react-bootstrap'
import SearchEvent from './SearchEvent'
import { connect } from "react-redux";
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
                <Container className="clsContent">

                    <Col className="signin-block">
                        <CreateAccount />
                    </Col>
                    <Col className="signin-block">
                        <Login />
                    </Col>
                </Container>
                {this.props.id}
                <Router>
                <Link to="/profile/user" >
                    <button >hi</button>
                </Link>
                <Route path="/profile/user" exact component={viewUser} />
                </Router>
                

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