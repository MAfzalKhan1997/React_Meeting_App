import React, { Component } from 'react';
import firebase from '../../Config/firebase';

class CreateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    static getDerivedStateFromProps() {
 
        const userAvail = JSON.parse(localStorage.getItem("user"));
        console.log(userAvail)

        firebase.database().ref(`/profiles/${userAvail.uid}/`).set({name:'afzal'})

        return null
    
      }

    render() {

        return (
            <center>
                <div>
 
                </div>
            </center>
        );
    }
}


export default CreateProfile;