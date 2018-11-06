import React, { Component } from 'react';
import firebase from '../../Config/firebase';

import MenuItem from '@material-ui/core/MenuItem';

class SignOut extends Component {


    signOut() {

        firebase.auth().signOut().then(function () {
            console.log("Sign-out successful.")
        }).catch(function (error) {
            console.log('Error:', error.message)
        });
    }

    render() {

        return (
            <MenuItem onClick={this.signOut}>SignOut</MenuItem>
        )

    }
}


export default SignOut;