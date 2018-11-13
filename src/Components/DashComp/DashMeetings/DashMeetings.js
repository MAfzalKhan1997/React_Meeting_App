import React, { Component } from 'react';
// import './Dashboard.css';

import Typography from '@material-ui/core/Typography';

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
            meetings: null,
        }
    }

    render() {

        const { meetings } = this.state;

        return (
            <div style={{height:'100%'}}>
                {
                    meetings ?
                        'meetings available'
                        :
                        <Typography variant="subtitle2" >
                            You haven’t done any meeting yet!
                        </Typography>
                } 
            </div>
        );
    }
}

export default DashMeetings;
