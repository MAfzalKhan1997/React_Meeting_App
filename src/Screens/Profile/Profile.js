import React, { Component } from 'react';
import './Profile.css';

import AuthState from '../../Helper/AuthState'
// import AppBar from '../../Components/AppBar/AppBar' 

class Profile extends Component {

  static getDerivedStateFromProps() {
    AuthState()

    const userAvail = JSON.parse(localStorage.getItem("user"));

    return {
      userAvail,
    }
  }

  render() {
    const {userAvail} = this.state;
    return (
      <center>
        <div>
          {
            userAvail ?
              'Profile.js'
              :
              null
          }
        </div>
      </center>
    );
  }
}

export default Profile;
