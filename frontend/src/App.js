import React, { Component } from 'react';
import './App.css';
import CreateAccount from './CreateAccount'
import Login from './Login'
import {Container, Col} from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Col className="signin-block">
            <CreateAccount/>
          </Col>
          <Col className="signin-block">
            <Login/>
          </Col>
        </Container>
      </div>
    );
  }
}

export default App;
