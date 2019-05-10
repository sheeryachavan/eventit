import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer';
import Home from './Home';
import EventContainer from './Events';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Navbar from './Navigation/TopNavigation';
import SideBar from './Navigation/SideDrawer';
import BackDrop from './Navigation/Backdrop';
library.add(faStroopwafel)
class App extends Component {
  state = {
    SideDrawerOpen: false
  };
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { SideDrawerOpen: !prevState.SideDrawerOpen }
    })
  };
  backDropClickHandler = () => {
    this.setState({
      SideDrawerOpen: false
    }
    )
  }
  render() {

    let backDrop;
    if (this.state.SideDrawerOpen) {

      backDrop = <BackDrop click={this.backDropClickHandler}/>;
    }
    return (
      <div>
        <div className="App">
          <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideBar show = {this.state.SideDrawerOpen}/>
          {backDrop}
          <div className="App-body">
            <Router>
              <Switch>
                <Route path="/events" component={EventContainer} />
                <Route path="/" component={Home} />
              </Switch>
            </Router>

          </div>
        </div>


        <Footer></Footer>
      </div>
    );
  }
}

export default App;
