import React, { Component } from 'react';
import './Profile.css';

import CreateProfile from '../../Components/CreateProfile/CreateProfile';
import AuthState from '../../Helper/AuthState'

class Profile extends Component {

  constructor() {
    super()

    this.state = {

    }
  }

  static getDerivedStateFromProps(props) {

    AuthState()

    const userAvail = JSON.parse(localStorage.getItem("user"));
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    console.log('userAvail', userAvail, 'userProfile', userProfile)

    return {
      userAvail,
      userProfile,
    }

  }

  render() {
    const { userAvail, userProfile } = this.state;
    return (
      <center>
        <div>
          {
            userAvail ?
              userProfile ?
                this.props.history.push('/dashboard')
                :
                'Profile'
                // <CreateProfile></CreateProfile>
              :
              this.props.history.push('/')
          }
        </div>
      </center>
    );
  }
}

export default Profile;
