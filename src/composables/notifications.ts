import { PushNotifications } from '@capacitor/push-notifications'
export function useNotifications() {
  const addListeners = async () => {
    await PushNotifications.addListener('registration', (token) => {
      console.info('Registration token: ', token.value)
    })

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error)
    })

    await PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push notification received: ', notification)
    })

    await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log(
        'Push notification action performed',
        notification.actionId,
        notification.inputValue
      )
    })

    return true
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
    const permStatus = await PushNotifications.checkPermissions()
    console.log('permStatus', permStatus)
    return permStatus.receive === 'granted'
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
