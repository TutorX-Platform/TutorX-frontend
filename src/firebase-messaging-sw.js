importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyCDHrQasHNc9q11grA2cBOCjl5YrlaKelc",
  authDomain: "tutorx-platform.firebaseapp.com",
  projectId: "tutorx-platform",
  storageBucket: "tutorx-platform.appspot.com",
  messagingSenderId: "324857557855",
  appId: "1:324857557855:web:5a08d8bb6d455e4d0ffcea",
  measurementId: "G-9Q2PX85B31"
});

const messaging = firebase.messaging();
