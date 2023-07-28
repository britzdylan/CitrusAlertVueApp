import { onMounted } from 'vue'
import {
  PushNotifications,
  type ActionPerformed,
  type PushNotificationSchema,
  type Token
} from '@capacitor/push-notifications'
import { LocalNotifications } from '@capacitor/local-notifications'
import User from '@/models/user'
import { useLemonStore } from '@/stores/lemon'
import { useStorage } from '@/composables/storage'

export function useNotifications() {
  const initialize = async () => {
    const { user, deviceInfo } = useLemonStore()
    const { get } = useStorage()
    if (deviceInfo?.platform === 'web') return
    // Check permission
    const permission = await PushNotifications.checkPermissions()
    if (permission.receive === 'prompt') {
      // Request permission
      await PushNotifications.requestPermissions()
    }

    // If on Android, check if notifications are enabled in system settings
    if (deviceInfo?.platform === 'android') {
      const notifEnabled = await LocalNotifications.checkPermissions()
      if (!notifEnabled) {
        // TODO: Show a message to the user explaining that they need to enable notifications
        console.log('opening app settings')
      }
    }

    // Register with the Apple / Google push notification services
    PushNotifications.register()

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', async (token: Token) => {
      // send token to store and save user in fireStore
      // create webhook first
      const encryptedKey = await get('api_key')
      // User.notificationUpdate({
      //   id: Number(user?.data?.id),
      //   notif_token: token.value,
      //   api_key: encryptedKey,
      //   webhook_id:
      // })
      console.log('Push registration success, token: ' + token.value)
    })

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error))
    })

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification))
      }
    )

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification))
      }
    )
  }

  onMounted(() => {
    initialize()
  })
}
