import React, { Component } from 'react';
import firebase from '../../Config/firebase'; 

class SignOut extends Component {


    signOut() {

        firebase.auth().signOut().then(function () {
            console.log("SignOut")
        }).catch(function (error) {
            console.log('Error:', error.message)
        });
    }

    render() {

        return (
            <span onClick={this.signOut}>Sign Out</span>
        )

    }
}


export default SignOut;