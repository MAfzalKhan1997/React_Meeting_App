import React, { Component } from 'react';
import './Dashboard.css';

import AuthState from '../../Helper/AuthState' 

class Profile extends Component {

  constructor() {
    super()

    this.state = {

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
            userAvail ?
              'Dashboard.js'
              :
              this.props.history.push('/')
          }
        </div>
      </center>
    );
  }
}

export default Profile;
