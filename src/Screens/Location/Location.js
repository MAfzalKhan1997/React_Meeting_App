import React, { Component } from 'react';
import './Location.css';

import LocSearch from '../../Components/LocSearch/LocSearch'
import AuthState from '../../Helper/AuthState'

class Location extends Component {

  constructor() {
    super()

    this.state = {

    }
  }

  static getDerivedStateFromProps(props) {

    AuthState()
    const userAvail = JSON.parse(localStorage.getItem("user"));
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    // console.log('derived',userAvail,'derived',userProfile)

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
    const { state } = this.props.location;
    return (
      <center>
        {console.log(state)}
        <div>
          {
            userAvail ?
              userProfile ?
                state ?
                  <LocSearch></LocSearch>
                  :
                  this.props.history.goBack()
                :
                this.props.history.push('/profile')
              :
              this.props.history.push('/')
          }
        </div>
      </center>
    );
  }
}

export default Location;
