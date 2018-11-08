import React, { Component } from 'react';
import firebase from '../../Config/firebase';

class SignOut extends Component {

    // constructor(props){
    //     super(props)

    // }

    signOut() {
 
        var props = this.props

        firebase.auth().signOut().then(function () {
            
            console.log("SignOut")
            props.history.push('/')

        }).catch(function (error) {
            console.log('Error:', error.message)
        });
    }

    render() {

        return (
            <span onClick={this.signOut.bind(this)}>Sign Out</span>
        )

    }
}

export default SignOut;