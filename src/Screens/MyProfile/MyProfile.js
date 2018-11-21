import React, { Component } from 'react';
// import './CreateProfile.css';

import MyProfileComp from '../../Components/MyProfileComp/MyProfileComp';
import AuthState from '../../Helper/AuthState'

class MyProfile extends Component {

    constructor() {
        super()

        this.state = {

        }
    }

    static getDerivedStateFromProps(props) {

        AuthState()

        const userAvail = JSON.parse(localStorage.getItem("user"));
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        // console.log('derived', userAvail, 'derived', userProfile)

        return {
            userAvail,
            userProfile,
        }

    }


    render() {
        const { userAvail, userProfile } = this.state;
        // const { state } = this.props.location;
        return (
            <center>
                {/* {console.log('from appbar state', state)} */}
                <div>
                    {
                        userAvail ?
                            userProfile ?
                                // state.userProfile ?
                                <MyProfileComp {...this.props}></MyProfileComp>
                                // :
                                // this.props.history.goBack()
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

export default MyProfile;
