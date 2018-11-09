import React, { Component } from 'react';
import firebase from '../../Config/firebase';

class SignIn extends Component {


    signIn() {
        var props = this.props;

        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;
            // The signed-in user info.

            var user = result.user.toJSON();
            console.log('SignIn')

            firebase.database().ref(`/profiles/${user.uid}/`).once('value', (data) => {
                console.log('profile value', data.val());
                localStorage.setItem("userProfile", JSON.stringify(data.val()));
            })

            var userObject = {
                Name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            };

            firebase.database().ref("/").child("users/" + user.uid).set(userObject)
                .then(() => {
                    console.log("User added to DataBase.");
                    props.history.push('/dashboard')
                })
                .catch(function (error) {
                    console.log('Error:', error.message)
                });


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
            <span onClick={this.signIn.bind(this)}> Sign In</span>
        )

    }
}


export default SignIn;