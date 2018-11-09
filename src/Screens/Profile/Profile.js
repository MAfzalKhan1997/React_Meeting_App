import React, { Component } from 'react';
import './Profile.css';

import CreateProfile from '../../Components/CreateProfile/CreateProfile';
import firebase from '../../Config/firebase';
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
    console.log(userAvail)

    // const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    // console.log(userProfile);

    return {
      userAvail,
      // userProfile,
    }

  }

  checkProfile(){
    const userAvail = JSON.parse(localStorage.getItem("user"));

    firebase.database().ref(`/profiles/${userAvail.uid}/`).once('value', (data) => {
      console.log(data.val());
      localStorage.setItem("userProfile",JSON.stringify(data.val()));
    })

    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    console.log(userProfile);

    this.setState({
      userProfile,
    })

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
                'asdfasdfsdf'
                // <CreateProfile></CreateProfile>
              :
              this.props.history.push('/')
          }

          {userAvail? this.checkProfile():null}
        </div>
      </center>
    );
  }
}

export default Profile;
