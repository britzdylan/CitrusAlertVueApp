// Scripts for firebase and firebase messaging
console.log('firebase-messaging-sw.js ///////////////////////////////////////////////////')
// This is a web build, register service worker if supported
if ('serviceWorker' in navigator) {
  importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
  importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

  // Initialize the Firebase app in the service worker by passing the generated config
  const firebaseConfig = {
    apiKey: 'AIzaSyAQELLpk5622IMVPx-jWZRL0ecJLJXNxhk',
    authDomain: 'citrusalert-0.firebaseapp.com',
    databaseURL: 'https://citrusalert-0-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'citrusalert-0',
    storageBucket: 'citrusalert-0.appspot.com',
    messagingSenderId: '1002204423830',
    appId: '1:1002204423830:web:7137b86f93dbd65d0284b7',
    measurementId: 'G-Y8VB1EDTCM'
  }

  firebase.initializeApp(firebaseConfig)

  // Retrieve firebase messaging
  const messaging = firebase.messaging()

  messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload)

    const notificationTitle = payload.notification.title
    const notificationOptions = {
      body: payload.notification.body
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
  })
}
