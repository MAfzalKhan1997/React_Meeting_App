import React, { Component } from 'react';
import firebase from '../../Config/firebase';

class SignOut extends Component {

    // constructor(props){
    //     super(props)

    // }

    signOut() { 
        console.log(this.props,'asdfasdf')
// var props = this.props
        firebase.auth().signOut().then(function () {
            console.log("SignOut")
                    // console.log(props,'asdfasdf')

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