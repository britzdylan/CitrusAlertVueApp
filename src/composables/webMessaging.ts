import { getToken, onMessage } from 'firebase/messaging'
import { useToast } from './toast'
import { LocalNotifications } from '@capacitor/local-notifications'
import { messaging } from '../firebase'

export const useFirebaseMessaging = () => {
  const requestPermissions = async () => {
    const newSw = await navigator.serviceWorker.register('../firebase-messaging-sw.js')

    return getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY || '',
      serviceWorkerRegistration: newSw
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('currentToken', currentToken)
          return currentToken
        } else {
          // Show permission request UI
          // console.log('No registration token available. Request permission to generate one.')
          // ...
          return null
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
        return err
      })
    // console.log('Permission already granted')
  }

  const checkPermissions = async () => {
    const { display } = await LocalNotifications.checkPermissions()
    return display === 'granted'
  }

  const addListeners = async () => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
      const { showToast } = useToast()
      showToast(payload?.notification?.title ?? 'You made a sale', 'info', true)
    })
  }
  return { addListeners, requestPermissions, checkPermissions, messaging }
}
