import React, { Component } from 'react';
import './Dashboard.css';

import DashComp from '../../Components/DashComp/DashComp'
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

    console.log('derived',userAvail,'derived',userProfile)

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
                // 'Dashboard'
                <DashComp></DashComp>
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
