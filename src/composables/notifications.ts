import { PushNotifications } from '@capacitor/push-notifications'
import { LocalNotifications } from '@capacitor/local-notifications'

export function useNotifications() {
  const addListeners = () => {
    return new Promise<string>((resolve, reject) => {
      PushNotifications.addListener('registration', (t) => {
        resolve(t.value)
      })

      PushNotifications.addListener('registrationError', (err) => {
        console.error('Registration error: ', err.error)
        reject(err.error)
      })

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received: ', notification)
      })

      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue
        )
      })
    })
  }

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions()

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions()
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!')
    }

    return await PushNotifications.register()
  }

  const checkNotificationPermissions = async () => {
    const permStatus = await LocalNotifications.checkPermissions()
    console.log('permStatus', permStatus)
    return permStatus.display === 'granted'
  }

  const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications()
    console.log('delivered notifications', notificationList)
  }

  return {
    addListeners,
    registerNotifications,
    getDeliveredNotifications,
    checkNotificationPermissions
  }
}
