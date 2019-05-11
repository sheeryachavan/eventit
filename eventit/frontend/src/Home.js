import React, { Component } from 'react';
import './App.css';
import CreateAccount from './User/CreateAccount'
import Login from './User/Login'
import { Container, Col } from 'react-bootstrap'
import SearchEvent from './SearchEvent'

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
          
        </div>
      );
    }
  }
  
  export default Home;