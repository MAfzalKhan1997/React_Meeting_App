import React, { Component } from 'react';
// import './Dashboard.css';

// import DashComp from '../../Components/DashComp/DashComp'
// import AuthState from '../../Helper/AuthState'
  

//   static getDerivedStateFromProps(props) {

//     AuthState()
//     const userAvail = JSON.parse(localStorage.getItem("user"));
//     const userProfile = JSON.parse(localStorage.getItem("userProfile"));

//     console.log('derived',userAvail,'derived',userProfile)

//     return {
//       userAvail,
//       userProfile, 
//     }
//   }


class DashMeetings extends Component {

    constructor() {
        super()

        this.state = {
            meetings:'You haven’t done any meeting yet!'
        }
    }
 
    render() {
  
        const { meetings } = this.state;

        return (
            <div>

             </div>
        );
    }
}
 
export default DashMeetings;
