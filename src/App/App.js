import React, { Component } from 'react';
import './App.css'; 

import AppBar from '../Components/AppBar/AppBar'
import Auth from '../Helper/AuthState'

class App extends Component {
  render() {
    return (
      <center>
        <div>
          <AppBar></AppBar> 
        </div>
      </center>
    );
  }
}

export default App;
