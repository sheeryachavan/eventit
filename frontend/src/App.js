import React, { Component } from 'react';
import './App.css';
import CreateAccount from './User/CreateAccount'
import Login from './User/Login'
import { Container, Col } from 'react-bootstrap'
import SearchEvent from './SearchEvent'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer';
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
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
