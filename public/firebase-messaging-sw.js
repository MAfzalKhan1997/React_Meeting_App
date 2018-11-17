importScripts('https://www.gstatic.com/firebasejs/5.5.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.5/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '1099060160126'
});

const messaging = firebase.messaging();