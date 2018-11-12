import firebase from '../Config/firebase';


const authState = () => {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            firebase.database().ref(`/profiles/${user.uid}/`).once('value', (data) => {
                // console.log('profile value', data.val());
                localStorage.setItem("userProfile", JSON.stringify(data.val()));
            })

            localStorage.setItem("user", JSON.stringify(user));
            // console.log("User available", user.email);

        } else {
            localStorage.setItem("user", null);
            localStorage.setItem("userProfile", null);
            console.log('User not available');
        }
    });
}

export default authState;