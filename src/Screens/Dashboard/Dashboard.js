import React, { Component } from 'react';
import './Dashboard.css';

import AuthState from '../../Helper/AuthState'

class Dashboard extends Component {

  constructor() {
    super()

    this.state = {
     
    }
  }

  static getDerivedStateFromProps(props) {

    AuthState()
    const userAvail = JSON.parse(localStorage.getItem("user"));
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    console.log('userAvail',userAvail,'userProfile',userProfile)

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
                'Dashboard'
                :
                this.props.history.push('/profile')
              // <CreateProfile></CreateProfile>
              :
              this.props.history.push('/')
          }
        </div>
      </center> 
    );
  }
}

export default Dashboard;
