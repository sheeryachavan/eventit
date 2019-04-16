import React, { Component } from 'react';
import './App.css';
import CreateAccount from './CreateAccount'
import Login from './Login'
import { Container, Col } from 'react-bootstrap'
import SearchEvent from './SearchEvent'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel)
class App extends Component {
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

export default App;
