import firebase from '../Config/firebase';


const authState = () => {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            console.log("User available", user.email);
        } else {
            localStorage.setItem("user", null);
            console.log('User not available');
            // props.history.push('/')
        }
    });
}


export default authState;