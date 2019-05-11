import React, { Component } from 'react';
import './App.css';
import CreateAccount from './User/CreateAccount'
import Login from './User/Login'
import { Container, Col } from 'react-bootstrap'
import SearchEvent from './SearchEvent'
import { connect } from "react-redux";
import { text } from '@fortawesome/fontawesome-svg-core';

class Home extends Component {
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