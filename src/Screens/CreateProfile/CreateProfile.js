import React, { Component } from 'react';
import './CreateProfile.css';

import Profile from '../../Components/Profile/Profile';
import AuthState from '../../Helper/AuthState'

class CreateProfile extends Component {

  constructor() {
    super()

    this.state = {

    }
  }

  static getDerivedStateFromProps(props) {

    AuthState()

    const userAvail = JSON.parse(localStorage.getItem("user"));
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    console.log('derived', userAvail, 'derived', userProfile)

    return {
      userAvail,
      userProfile,
    }

  }

  // componentDidMount() {

  //   AuthState()
  //   const userAvail = JSON.parse(localStorage.getItem("user"));
  //   const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  //   console.log('did',userAvail,'did',userProfile)

  //   this.setState({
  //     userAvail,
  //     userProfile, 
  //   })

  // }

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
                <Profile {...this.props}></Profile>
              :
              this.props.history.push('/')
          }
        </div>
      </center>
    );
  }
}

export default CreateProfile;
