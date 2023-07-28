// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAQELLpk5622IMVPx-jWZRL0ecJLJXNxhk',
  authDomain: 'citrusalert-0.firebaseapp.com',
  databaseURL: 'https://citrusalert-0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'citrusalert-0',
  storageBucket: 'citrusalert-0.appspot.com',
  messagingSenderId: '1002204423830',
  appId: '1:1002204423830:web:7137b86f93dbd65d0284b7',
  measurementId: 'G-Y8VB1EDTCM'
})
const analytics = getAnalytics(firebaseApp)
console.log(analytics, 'analytics is here')
const db = getFirestore(firebaseApp)

export { db, analytics }
