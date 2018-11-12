import React, { Component } from 'react';
import './App.css';
import AuthState from '../../Helper/AuthState'

import Login from '../../Components/Login/Login'

class App extends Component {

  constructor(){
    super()

    this.state={
      
    }
  }


  static getDerivedStateFromProps() {
    
    AuthState()
    const userAvail = JSON.parse(localStorage.getItem("user"));

    return {
      userAvail,
    }
  }

  render() {
    const { userAvail } = this.state;
    return (
      <center>
        <div>
          {
            !userAvail ?
              <Login {...this.props} />
              : 
              this.props.history.push('/dashboard')
          }
        </div>
      </center>
    );
  }
}

export default App;
