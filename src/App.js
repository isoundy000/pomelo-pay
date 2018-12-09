import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-Container">
          <header>
            <p className="header-left">My Financial Transactions</p>
            <p className="header-right"></p>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
