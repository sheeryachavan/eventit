import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer';
import Home from './Home';
import EventContainer from './Events';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
library.add(faStroopwafel)
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <div className="App-body">
              <Switch>
                <Route path="/events" component={EventContainer} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </Router>

        <Footer></Footer>
      </div>
    );
  }
}

export default App;
