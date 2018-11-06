import React, { Component } from 'react';
import firebase from '../../Config/firebase';

import MenuItem from '@material-ui/core/MenuItem';

class SignIn extends Component {


    signIn() {
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user.toJSON();
            console.log('SignIn.js', user)

        }).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error:', errorMessage)
            // The email of the user's account used.
            // var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;

        });
    }

    render() {

        return (

            <MenuItem onClick={this.signIn}>SignIn</MenuItem>

        )

    }
}


export default SignIn;