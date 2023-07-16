// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import exp from 'constants'
// import { useToast } from './composables/toast'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAQELLpk5622IMVPx-jWZRL0ecJLJXNxhk',
  authDomain: 'citrusalert-0.firebaseapp.com',
  projectId: 'citrusalert-0',
  storageBucket: 'citrusalert-0.appspot.com',
  messagingSenderId: '1002204423830',
  appId: '1:1002204423830:web:7137b86f93dbd65d0284b7',
  measurementId: 'G-Y8VB1EDTCM'
})

export const analytics = getAnalytics(firebaseApp)
