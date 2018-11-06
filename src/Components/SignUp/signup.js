import React, { Component } from 'react';
import firebase from '../../Config/firebase';

const Signup = () => {
    return (
        <div>
            <button onClick={login}>signin</button>
            <button onClick={logout}>signout</button>
        </div>
    )
}
const login = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user.toJSON();
        console.log(user, 'signup.js')

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

const logout = () => {

    firebase.auth().signOut().then(function () {
        console.log("Sign-out successful.")
    }).catch(function (error) {
        console.log('Error:',error)
    });
}


export default Signup;