import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { useToast } from './toast'
import { useStorage } from './storage'
import { LocalNotifications } from '@capacitor/local-notifications'
export const useFirebaseMessaging = () => {
  const fireBaseMessaging = getMessaging()
  const { get } = useStorage()

  const requestPermissions = async () => {
    return getToken(fireBaseMessaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY || ''
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
        // console.log('An error occurred while retrieving token. ', err)
        return err
      })
    // console.log('Permission already granted')
  }

  const checkPermissions = async () => {
    const { display } = await LocalNotifications.checkPermissions()
    return display === 'granted'
  }

  const addListeners = async () => {
    onMessage(fireBaseMessaging, (payload) => {
      console.log('Message received. ', payload)
      const { showToast } = useToast()
      showToast(payload?.notification?.title, 'info', true)
    })
  }
  return { addListeners, requestPermissions, checkPermissions, fireBaseMessaging }
}
