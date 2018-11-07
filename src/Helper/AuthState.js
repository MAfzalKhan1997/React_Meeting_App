import { Component } from 'react';
import firebase from '../Config/firebase';

class AuthState extends Component {

    authCheck() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                console.log("User available", user.email);
            } else {
                // localStorage.setItem("user", null);
                console.log('User not available');
            }
        });
    }

    render() {
        return (
            this.authCheck()
        )

    }
}

export default AuthState;