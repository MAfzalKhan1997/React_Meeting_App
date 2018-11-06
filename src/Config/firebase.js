import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDvJxUiQH6ArD63AW4qYIVxitE0E0w6BA4",
  authDomain: "meetup-mak.firebaseapp.com",
  databaseURL: "https://meetup-mak.firebaseio.com",
  projectId: "meetup-mak",
  storageBucket: "",
  messagingSenderId: "1099060160126"
};

firebase.initializeApp(config);

export default firebase;