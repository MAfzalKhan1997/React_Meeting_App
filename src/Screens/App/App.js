import React, { Component } from 'react';
import './App.css';

import AppBar from '../../Components/AppBar/AppBar'
import Login from '../../Components/Login/Login'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {

    };

  }
 
  render() {
    return (
      <center>
        <div>
          <AppBar {...this.props}></AppBar>
          <Login {...this.props} />
        </div>
      </center>
    );
  }
}

export default App;
