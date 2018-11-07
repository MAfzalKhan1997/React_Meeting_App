import React, { Component } from 'react';
import './App.css'; 

import AppBar from '../Components/AppBar/AppBar'
import Login from '../Components/Login/Login'

class App extends Component {
  render() {
    return (
      <center>
        <div>
          <AppBar></AppBar>
          <Login></Login>
        </div>
      </center>
    );
  }
}

export default App;
