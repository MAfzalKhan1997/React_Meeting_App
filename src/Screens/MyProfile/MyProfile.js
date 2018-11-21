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

        return (
            <center>
                <div>
                    {
                        userAvail ?
                            userProfile ?
                                <MyProfileComp {...this.props}></MyProfileComp>
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
