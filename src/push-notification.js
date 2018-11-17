import firebase from "./Config/firebase";

export const askForPermissioToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);
    firebase.database().ref('/fcmTokens').child(token).set(firebase.auth().currentUser.uid);

    return token;
  } catch (error) {
    alert('Notifications are Disabled')
    console.error(error);
  }
}