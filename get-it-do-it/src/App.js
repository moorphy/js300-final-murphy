import React, { Component } from 'react';
import './App.css';
import ListPage from './List/ListPage';
import HomePage from './HomePage/HomePage';
import NavBar from './NavBar/NavBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/yourlist" component={ListPage} />
      </div>
      </Router>
      </div>
    );
  }
}

export default App;
