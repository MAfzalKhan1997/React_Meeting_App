import firebase from '../Config/firebase';
// import Routes from '../Routes/Routes'

const authState = () => {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            console.log("User available", user.email);
            // Routes()

        } else {
            localStorage.setItem("user", null);
            console.log('User not available');
            // Routes()
            // props.history.push('/')
        }
    });
}


export default authState;